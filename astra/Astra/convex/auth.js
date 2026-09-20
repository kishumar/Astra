// convex/auth.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuid } from "uuid";

// Login mutation
export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async ({ db }, { email, password }) => {
    const admin = await db
      .query("admins")
      .withIndex("by_email", q => q.eq("email", email))
      .unique();

    if (!admin || admin.password !== password) {
      throw new Error("Invalid email or password");
    }

    const token = uuid();
    const now = Date.now();
const expiresAt = Date.now() + 60 * 60 * 1000; // 1 ghnte ka session rkhta hu


    await db.insert("sessions", {

      token,
      createdAt: now,
      expiresAt,
    });

    return { success: true, token };
  },
});

// Add admin (manual use by super admin)
export const addAdmin = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async ({ db }, { email, password }) => {
    await db.insert("admins", {
      email,
      password, // ⚠️ in production: hash this
    });
    return { success: true };
  },
});
