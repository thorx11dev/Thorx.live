import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTaskSchema, insertPayoutSchema, insertContactMessageSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailService } from "./emailService";
import { developmentEmailService } from "./emailService.dev";

const JWT_SECRET = process.env.JWT_SECRET || "thorx-cosmic-secret-key";

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as any;
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username) || 
                           await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user (initially unverified)
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Send verification email (use production email service)
      const emailSent = await emailService.sendVerificationEmail(user.id, user.email);
      
      if (!emailSent) {
        console.error("Failed to send verification email to:", user.email);
        // Don't fail registration if email fails - user can resend later
      }

      // Generate JWT token (user can login but features will be limited until verified)
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "User created successfully. Please check your email for verification instructions.",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified
        },
        requiresEmailVerification: true
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Find user by email or username
      const user = await storage.getUserByEmail(email) || 
                   await storage.getUserByUsername(email);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          totalEarnings: user.totalEarnings,
          isEmailVerified: user.isEmailVerified
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Email verification routes
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: "Verification token required" });
      }

      // Verify the token (use production email service)
      const verificationResult = await emailService.verifyEmailToken(token);
      
      if (!verificationResult.success) {
        return res.status(400).json({ 
          error: verificationResult.error || "Invalid verification token" 
        });
      }

      // Mark email as verified in database
      const user = await storage.verifyUserEmail(verificationResult.userId!);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        message: "Email verified successfully! You can now access all Thorx features.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified,
          emailVerifiedAt: user.emailVerifiedAt
        }
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/resend-verification", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      
      // Get user details
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({ error: "Email is already verified" });
      }

      // Resend verification email (use production email service)
      const emailSent = await emailService.resendVerificationEmail(user.id, user.email);
      
      if (!emailSent) {
        return res.status(500).json({ error: "Failed to send verification email" });
      }

      res.json({
        message: "Verification email sent successfully. Please check your inbox."
      });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/auth/verification-status", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      
      // Get user details
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        isEmailVerified: user.isEmailVerified,
        emailVerifiedAt: user.emailVerifiedAt,
        email: user.email
      });
    } catch (error) {
      console.error("Verification status error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team member authentication routes
  app.post("/api/team/login", async (req, res) => {
    try {
      const { name, password } = req.body;
      
      console.log("Team login attempt:", { name, passwordLength: password?.length });
      
      if (!name || !password) {
        return res.status(400).json({ error: "Name and password required" });
      }

      // Find team member
      const teamMember = await storage.getTeamMemberByName(name);
      
      if (!teamMember) {
        console.log("Team member not found:", name);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if team member is active
      if (!teamMember.isActive) {
        console.log("Team member inactive:", name);
        return res.status(401).json({ error: "Account is inactive" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, teamMember.password);
      
      if (!isValidPassword) {
        console.log("Invalid password for:", name);
        return res.status(401).json({ error: "Invalid password. Please check your password and try again." });
      }

      // Generate JWT token for team member
      const token = jwt.sign(
        { 
          teamMemberId: teamMember.id, 
          name: teamMember.name,
          role: teamMember.role,
          type: 'team'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        teamMember: {
          id: teamMember.id,
          name: teamMember.name,
          email: teamMember.email,
          role: teamMember.role
        }
      });
    } catch (error) {
      console.error("Team login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Middleware to verify team member token
  const authenticateTeamMember = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (decoded.type !== 'team') {
        return res.status(403).json({ error: 'Team member access required' });
      }
      req.teamMember = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };

  // Team member routes
  app.get("/api/team/profile", authenticateTeamMember, async (req: any, res) => {
    try {
      const teamMember = await storage.getTeamMember(req.teamMember.teamMemberId);
      
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }

      res.json({
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        role: teamMember.role,
        isActive: teamMember.isActive,
        createdAt: teamMember.createdAt
      });
    } catch (error) {
      console.error("Team profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User management routes (for User Care page)
  app.get("/api/team/users", authenticateTeamMember, async (req: any, res) => {
    try {
      // Get all users for the database view
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/users/:id/ban", authenticateTeamMember, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { reason } = req.body;
      
      if (!reason) {
        return res.status(400).json({ error: "Ban reason is required" });
      }

      // Update user ban status
      const user = await storage.updateUserBanStatus(userId, true, reason);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create ban report
      await storage.createBanReport({
        userId,
        teamMemberId: req.teamMember.teamMemberId,
        reason,
        action: 'ban'
      });

      res.json({ message: "User banned successfully", user });
    } catch (error) {
      console.error("Ban user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/users/:id/unban", authenticateTeamMember, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { reason } = req.body;
      
      if (!reason) {
        return res.status(400).json({ error: "Unban reason is required" });
      }

      // Update user ban status
      const user = await storage.updateUserBanStatus(userId, false);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create unban report
      await storage.createBanReport({
        userId,
        teamMemberId: req.teamMember.teamMemberId,
        reason,
        action: 'unban'
      });

      res.json({ message: "User unbanned successfully", user });
    } catch (error) {
      console.error("Unban user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact messages routes (for Inbox page)
  app.get("/api/team/messages", authenticateTeamMember, async (req: any, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Messages error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/messages/:id/read", authenticateTeamMember, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const message = await storage.markMessageAsRead(messageId);
      
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json({ message: "Message marked as read", message });
    } catch (error) {
      console.error("Mark message read error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team chat routes (for Team Hub page)
  app.get("/api/team/chat", authenticateTeamMember, async (req: any, res) => {
    try {
      const chats = await storage.getAllTeamChats();
      res.json(chats);
    } catch (error) {
      console.error("Chats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/chat", authenticateTeamMember, async (req: any, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const chat = await storage.createTeamChat({
        senderId: req.teamMember.teamMemberId,
        message
      });

      res.status(201).json(chat);
    } catch (error) {
      console.error("Create chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team Hub routes (CEO only)
  app.get("/api/team/members", authenticateTeamMember, async (req: any, res) => {
    try {
      // Check if user is CEO
      if (req.teamMember.role !== 'ceo') {
        return res.status(403).json({ error: "CEO access required" });
      }

      const members = await storage.getAllTeamMembers();
      // Remove passwords from response
      const safeMembers = members.map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        isActive: member.isActive,
        createdAt: member.createdAt
      }));

      res.json(safeMembers);
    } catch (error) {
      console.error("Team members error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/members/:id/password", authenticateTeamMember, async (req: any, res) => {
    try {
      // Check if user is CEO
      if (req.teamMember.role !== 'ceo') {
        return res.status(403).json({ error: "CEO access required" });
      }

      const memberId = parseInt(req.params.id);
      const { newPassword } = req.body;
      
      if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password
      const member = await storage.updateTeamMemberPassword(memberId, hashedPassword);
      
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Update password error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form route (public)
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(messageData);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // User routes
  app.get("/api/user/profile", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        totalEarnings: user.totalEarnings,
        isActive: user.isActive,
        createdAt: user.createdAt
      });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Task routes
  app.get("/api/tasks", authenticateToken, async (req: any, res) => {
    try {
      const tasks = await storage.getUserTasks(req.user.userId);
      res.json(tasks);
    } catch (error) {
      console.error("Tasks error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/tasks", authenticateToken, async (req: any, res) => {
    try {
      const taskData = insertTaskSchema.parse({
        ...req.body,
        userId: req.user.userId
      });
      
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Create task error:", error);
      res.status(400).json({ error: "Invalid task data" });
    }
  });

  app.patch("/api/tasks/:id/status", authenticateToken, async (req: any, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const task = await storage.updateTaskStatus(taskId, status);
      
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Payout routes
  app.get("/api/payouts", authenticateToken, async (req: any, res) => {
    try {
      const payouts = await storage.getUserPayouts(req.user.userId);
      res.json(payouts);
    } catch (error) {
      console.error("Payouts error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/payouts", authenticateToken, async (req: any, res) => {
    try {
      const payoutData = insertPayoutSchema.parse({
        ...req.body,
        userId: req.user.userId
      });
      
      const payout = await storage.createPayout(payoutData);
      res.status(201).json(payout);
    } catch (error) {
      console.error("Create payout error:", error);
      res.status(400).json({ error: "Invalid payout data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
