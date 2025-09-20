import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculations = pgTable("calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  expression: text("expression").notNull(),
  result: text("result").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const memoryValues = pgTable("memory_values", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  value: text("value").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  timestamp: true,
});

export const insertMemoryValueSchema = createInsertSchema(memoryValues).omit({
  id: true,
  timestamp: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
export type InsertMemoryValue = z.infer<typeof insertMemoryValueSchema>;
export type MemoryValue = typeof memoryValues.$inferSelect;
