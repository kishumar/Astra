import { query } from "./_generated/server";
import { v } from "convex/values";

export const validateSession = query({
  args: { token: v.string() },
  handler: async ({ db }, { token }) => {
    const session = await db
      .query("sessions")
      .filter(q => q.eq(q.field("token"), token))
      .first();

    if (!session) return { valid: false };
    if (Date.now() > session.expiresAt) return { valid: false }; // use server time

    return { valid: true };
  },
});
