import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTaskSchema, insertPayoutSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      // Find user
      const user = await storage.getUserByUsername(username) || 
                   await storage.getUserByEmail(username);
      
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
          totalEarnings: user.totalEarnings
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
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
