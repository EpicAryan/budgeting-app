import { decimal, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


export const envelopes = pgTable('envelopes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: decimal('amount', { precision:10, scale: 2}).notNull().default('0'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const income = pgTable('income', {
  id: serial('id').primaryKey(),
  amount: decimal('amount', { precision:10, scale: 2}).notNull().default('0'),
  createdAt: timestamp('created_at').defaultNow(),
})
