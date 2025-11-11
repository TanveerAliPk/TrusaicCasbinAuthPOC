import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Roles table for RBAC
 */
export const roles = mysqlTable("roles", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Role = typeof roles.$inferSelect;
export type InsertRole = typeof roles.$inferInsert;

/**
 * User attributes for ABAC
 */
export const userAttributes = mysqlTable("userAttributes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  attributeKey: varchar("attributeKey", { length: 64 }).notNull(),
  attributeValue: varchar("attributeValue", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserAttribute = typeof userAttributes.$inferSelect;
export type InsertUserAttribute = typeof userAttributes.$inferInsert;

/**
 * Casbin policies table
 */
export const casbinPolicies = mysqlTable("casbinPolicies", {
  id: int("id").autoincrement().primaryKey(),
  policyType: varchar("policyType", { length: 64 }).notNull(), // 'p' for policy, 'g' for grouping
  subject: varchar("subject", { length: 255 }).notNull(),
  object: varchar("object", { length: 255 }).notNull(),
  action: varchar("action", { length: 64 }).notNull(),
  effect: varchar("effect", { length: 16 }).default("allow").notNull(), // 'allow' or 'deny'
  conditions: text("conditions"), // JSON string for ABAC conditions
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CasbinPolicy = typeof casbinPolicies.$inferSelect;
export type InsertCasbinPolicy = typeof casbinPolicies.$inferInsert;

/**
 * Resources table for testing access
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  resourceType: varchar("resourceType", { length: 64 }).notNull(),
  ownerId: int("ownerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  department: varchar("department", { length: 64 }),
  classification: varchar("classification", { length: 64 }).default("public").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;