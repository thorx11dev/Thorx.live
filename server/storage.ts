import { 
  users, tasks, payouts, teamMembers, contactMessages, teamChats, banReports,
  type User, type InsertUser, type Task, type InsertTask, type Payout, type InsertPayout,
  type TeamMember, type InsertTeamMember, type ContactMessage, type InsertContactMessage,
  type TeamChat, type InsertTeamChat, type BanReport, type InsertBanReport
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserBanStatus(userId: number, isBanned: boolean, reason?: string): Promise<User | undefined>;
  
  // Email verification methods
  verifyUserEmail(userId: number): Promise<User | undefined>;
  updateVerificationToken(userId: number, token: string, expiry: Date): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  
  // Task methods
  getUserTasks(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(taskId: number, status: string): Promise<Task | undefined>;
  
  // Payout methods
  getUserPayouts(userId: number): Promise<Payout[]>;
  createPayout(payout: InsertPayout): Promise<Payout>;
  updatePayoutStatus(payoutId: number, status: string, reference?: string): Promise<Payout | undefined>;
  
  // Team member methods
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMemberByName(name: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  updateTeamMemberPassword(id: number, password: string): Promise<TeamMember | undefined>;
  
  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(messageId: number): Promise<ContactMessage | undefined>;
  
  // Team chat methods
  getAllTeamChats(): Promise<TeamChat[]>;
  createTeamChat(chat: InsertTeamChat): Promise<TeamChat>;
  
  // Ban report methods
  createBanReport(report: InsertBanReport): Promise<BanReport>;
  getBanReportsByUser(userId: number): Promise<BanReport[]>;
  
  // Enhanced user ban methods
  banUser(userId: number, reason: string, bannedBy: number): Promise<User | undefined>;
  unbanUser(userId: number, reason: string, unbannedBy: number): Promise<User | undefined>;
  getBannedUsers(): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return db.select().from(tasks).where(eq(tasks.userId, userId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values(insertTask)
      .returning();
    return task;
  }

  async updateTaskStatus(taskId: number, status: string): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({ 
        status,
        completedAt: status === 'completed' ? new Date() : null
      })
      .where(eq(tasks.id, taskId))
      .returning();
    return task || undefined;
  }

  async getUserPayouts(userId: number): Promise<Payout[]> {
    return db.select().from(payouts).where(eq(payouts.userId, userId));
  }

  async createPayout(insertPayout: InsertPayout): Promise<Payout> {
    const [payout] = await db
      .insert(payouts)
      .values(insertPayout)
      .returning();
    return payout;
  }

  async updatePayoutStatus(payoutId: number, status: string, reference?: string): Promise<Payout | undefined> {
    const [payout] = await db
      .update(payouts)
      .set({ 
        status,
        reference,
        completedAt: status === 'completed' ? new Date() : null
      })
      .where(eq(payouts.id, payoutId))
      .returning();
    return payout || undefined;
  }

  async updateUserBanStatus(userId: number, isBanned: boolean, reason?: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        isBanned,
        banReason: reason || null,
        bannedAt: isBanned ? new Date() : null
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  // Team member methods
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async getTeamMemberByName(name: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.name, name));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers);
  }

  async updateTeamMemberPassword(id: number, password: string): Promise<TeamMember | undefined> {
    const [member] = await db
      .update(teamMembers)
      .set({ password })
      .where(eq(teamMembers.id, id))
      .returning();
    return member || undefined;
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }

  async markMessageAsRead(messageId: number): Promise<ContactMessage | undefined> {
    const [message] = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, messageId))
      .returning();
    return message || undefined;
  }

  // Team chat methods
  async getAllTeamChats(): Promise<TeamChat[]> {
    return db.select().from(teamChats).orderBy(desc(teamChats.createdAt));
  }

  async createTeamChat(chat: InsertTeamChat): Promise<TeamChat> {
    const [newChat] = await db
      .insert(teamChats)
      .values(chat)
      .returning();
    return newChat;
  }

  // Ban report methods
  async createBanReport(report: InsertBanReport): Promise<BanReport> {
    const [newReport] = await db
      .insert(banReports)
      .values(report)
      .returning();
    return newReport;
  }

  async getBanReportsByUser(userId: number): Promise<BanReport[]> {
    return db.select().from(banReports).where(eq(banReports.userId, userId));
  }

  async banUser(userId: number, reason: string, bannedBy: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        isBanned: true, 
        banReason: reason, 
        bannedBy: bannedBy,
        bannedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    // Create ban report
    await this.createBanReport({
      userId,
      teamMemberId: bannedBy,
      reason,
      action: 'ban'
    });
    
    return user || undefined;
  }

  async unbanUser(userId: number, reason: string, unbannedBy: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        isBanned: false, 
        banReason: null,
        bannedBy: null,
        bannedAt: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    // Create unban report
    await this.createBanReport({
      userId,
      teamMemberId: unbannedBy,
      reason,
      action: 'unban'
    });
    
    return user || undefined;
  }

  async getBannedUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isBanned, true)).orderBy(desc(users.bannedAt));
  }

  // Email verification methods
  async verifyUserEmail(userId: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
        verificationToken: null,
        verificationTokenExpiry: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateVerificationToken(userId: number, token: string, expiry: Date): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        verificationToken: token,
        verificationTokenExpiry: expiry,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.verificationToken, token))
      .limit(1);
    return user || undefined;
  }
}

export const storage = new DatabaseStorage();
