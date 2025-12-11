import { pgTable, serial, text, timestamp, integer, boolean, varchar } from "drizzle-orm/pg-core"

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  role: text("role"),
  website: text("website"),
  linkedIn: text("linkedin"),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  source: text("source").default("manual"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  template: text("template").notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  sentCount: integer("sent_count").default(0).notNull(),
  openCount: integer("open_count").default(0).notNull(),
  replyCount: integer("reply_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaigns.id),
  leadId: integer("lead_id").references(() => leads.id),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Types
export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
export type Campaign = typeof campaigns.$inferSelect
export type NewCampaign = typeof campaigns.$inferInsert
export type EmailLog = typeof emailLogs.$inferSelect
export type NewEmailLog = typeof emailLogs.$inferInsert
