import { users, tasks, payouts, type User, type InsertUser, type Task, type InsertTask, type Payout, type InsertPayout } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserTasks(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(taskId: number, status: string): Promise<Task | undefined>;
  
  getUserPayouts(userId: number): Promise<Payout[]>;
  createPayout(payout: InsertPayout): Promise<Payout>;
  updatePayoutStatus(payoutId: number, status: string, reference?: string): Promise<Payout | undefined>;
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
}

export const storage = new DatabaseStorage();
