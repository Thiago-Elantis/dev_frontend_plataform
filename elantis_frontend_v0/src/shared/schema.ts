import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  email: text("email"),
  phone: text("phone"),
  category: text("category"),
});

export const inventoryItems = pgTable("inventory_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  totalQuantity: integer("total_quantity").notNull().default(0),
});

export type MapElementProperties = {
  color?: string;
  rotation?: number;
  date?: string;
  startTime?: string;
  maxParticipants?: number;
  [key: string]: unknown; // Permitir extensões livres se necessário
};

export const eventMaps = pgTable("event_maps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  canvasData: jsonb("canvas_data"),
  createdBy: integer("created_by").references(() => users.id),
});

export const mapElements = pgTable("map_elements", {
  id: serial("id").primaryKey(),
  mapId: integer("map_id").notNull().references(() => eventMaps.id),
  type: text("type").notNull(), // 'stand' | 'talk' | 'line' | 'shape'
  name: text("name").notNull(),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
  width: integer("width"),
  height: integer("height"),
  properties: jsonb("properties").$type<MapElementProperties>(),
  companyId: integer("company_id").references(() => companies.id),
});


export const elementInventory = pgTable("element_inventory", {
  id: serial("id").primaryKey(),
  elementId: integer("element_id").notNull().references(() => mapElements.id),
  inventoryItemId: integer("inventory_item_id").notNull().references(() => inventoryItems.id),
  quantity: integer("quantity").notNull(),
  notes: text("notes"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true });
export const insertInventoryItemSchema = createInsertSchema(inventoryItems).omit({ id: true });
export const insertEventMapSchema = createInsertSchema(eventMaps).omit({ id: true });
export const insertMapElementSchema = createInsertSchema(mapElements).omit({ id: true });
export const insertElementInventorySchema = createInsertSchema(elementInventory).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;

export type EventMap = typeof eventMaps.$inferSelect;
export type InsertEventMap = z.infer<typeof insertEventMapSchema>;

export type MapElement = typeof mapElements.$inferSelect;
export type InsertMapElement = z.infer<typeof insertMapElementSchema>;

export type ElementInventory = typeof elementInventory.$inferSelect;
export type InsertElementInventory = z.infer<typeof insertElementInventorySchema>;

// Extended types for API responses
export type MapElementWithDetails = MapElement & {
  company?: Company;
  inventory?: (ElementInventory & { item: InventoryItem })[];
};

export type EventMapWithElements = EventMap & {
  elements: MapElementWithDetails[];
};
