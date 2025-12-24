import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logSession = mutation({
	args: {
		userId: v.string(),
		emotionPath: v.array(v.string()),
		leafEmotion: v.string(),
		intensity: v.number(),
		trigger: v.string(),
	},
	handler: async (ctx, args) => {
		const sessionId = await ctx.db.insert("emotionSessions", {
			userId: args.userId,
			emotionPath: args.emotionPath,
			leafEmotion: args.leafEmotion,
			intensity: args.intensity,
			trigger: args.trigger,
			timestamp: new Date().toISOString(),
		});
		return sessionId;
	},
});

export const getSessions = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("emotionSessions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.order("desc")
			.take(100);
	},
});

export const getSessionsByMonth = query({
	args: {
		userId: v.string(),
		year: v.number(),
		month: v.number(),
	},
	handler: async (ctx, args) => {
		const startDate = new Date(args.year, args.month - 1, 1).toISOString();
		const endDate = new Date(
			args.year,
			args.month,
			0,
			23,
			59,
			59
		).toISOString();

		const sessions = await ctx.db
			.query("emotionSessions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.filter((q) =>
				q.and(
					q.gte(q.field("timestamp"), startDate),
					q.lte(q.field("timestamp"), endDate)
				)
			)
			.order("desc")
			.collect();

		return sessions;
	},
});

export const getRecentSession = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const sessions = await ctx.db
			.query("emotionSessions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.order("desc")
			.take(1);
		return sessions[0] ?? null;
	},
});
