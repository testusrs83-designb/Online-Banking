import { pgTable, serial, varchar, numeric, timestamp, integer, text, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  email_verified: integer("email_verified").notNull().default(0),
  kyc_status: varchar("kyc_status", { length: 32 }).notNull(),
  kyc_submitted_at: timestamp("kyc_submitted_at"),
  created_at: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  type: varchar("type", { length: 32 }).notNull(),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("0"),
  status: varchar("status", { length: 32 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  account_id: integer("account_id").references(() => accounts.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const kyc_submissions = pgTable("kyc_submissions", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  status: varchar("status", { length: 32 }).notNull(),
  submitted_at: timestamp("submitted_at").defaultNow(),
});

export const audit_logs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  ip_address: varchar("ip_address", { length: 45 }),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at").defaultNow(),
});

export const session = pgTable("session", {
  sid: varchar("sid").notNull(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});
