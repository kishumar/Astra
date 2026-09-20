// convex/reports.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateReportStatus = mutation({
  args: { id: v.id("submittedreport"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
