import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0.00"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // 'ads', 'social', 'sites'
  title: text("title").notNull(),
  description: text("description"),
  reward: decimal("reward", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payouts = pgTable("payouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull(),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  method: text("method").notNull().default("jazzcash"),
  phoneNumber: text("phone_number").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  reference: text("reference"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  payouts: many(payouts),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
  user: one(users, {
    fields: [payouts.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  type: true,
  title: true,
  description: true,
  reward: true,
});

export const insertPayoutSchema = createInsertSchema(payouts).pick({
  userId: true,
  amount: true,
  platformFee: true,
  finalAmount: true,
  phoneNumber: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertPayout = z.infer<typeof insertPayoutSchema>;
export type Payout = typeof payouts.$inferSelect;
