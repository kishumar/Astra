import { query } from "./_generated/server";

export const Fetchreport = query({
  handler: async (ctx) => {
    const reports = await ctx.db.query("submittedreport").collect();
    return reports; // returns an array (possibly empty)
  },
});
