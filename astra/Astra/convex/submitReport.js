import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitReport = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    incidentType: v.string(),
    location: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert into the database with initial status
    const id = await ctx.db.insert("submittedreport", {
      ...args,
      status: "Pending", // Initial status
    });
    return id;
  },
});