import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submittedreport: defineTable({
    title: v.string(), // report title
    description: v.string(), // detailed description
    incidentType: v.string(), // type of incident
    location: v.string(), // address or coordinates
    image: v.string(), // optional image URL
    status: v.string(), // Pending, InProgress, Resolved
  }),

  admins: defineTable({
    email: v.string(),
    password: v.string(), // later we can hash it with bcrypt
  }).index("by_email", ["email"]),

  //sessions management for admin authentication
   sessions: defineTable({
   
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  }),
});
