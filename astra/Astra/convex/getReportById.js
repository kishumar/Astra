import { query } from "./_generated/server";
import { v } from "convex/values";

export const getReportById = query({
  args: { id: v.id("submittedreport") },
  handler: async (ctx, args) => {
    const report = await ctx.db.get(args.id);
    return report; // returns null if not found
  },
});
