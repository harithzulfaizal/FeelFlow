import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	emotionSessions: defineTable({
		userId: v.optional(v.string()),
		emotionPath: v.array(v.string()),
		leafEmotion: v.string(),
		intensity: v.number(),
		trigger: v.string(),
		timestamp: v.string(),
	})
		.index("by_user", ["userId", "timestamp"])
		.index("by_timestamp", ["timestamp"]),
});
