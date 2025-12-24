import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

interface ProgressBarProps {
	currentDepth: number;
	maxDepth: number;
}

export function ProgressBar({ currentDepth, maxDepth }: ProgressBarProps) {
	const { colors } = useTheme();
	const progress = currentDepth / maxDepth;

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: colors.textSecondary }]}>
				Layer {currentDepth} of {maxDepth}
			</Text>
			<View style={[styles.track, { backgroundColor: colors.border }]}>
				<View
					style={[
						styles.fill,
						{ width: `${progress * 100}%`, backgroundColor: colors.success },
					]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: spacing.xs,
	},
	label: {
		fontSize: typography.sizes.xs,
		fontWeight: typography.weights.medium,
		letterSpacing: 1,
		textTransform: "uppercase",
	},
	track: {
		width: 100,
		height: 3,
		borderRadius: borderRadius.full,
		overflow: "hidden",
	},
	fill: {
		height: "100%",
		borderRadius: borderRadius.full,
	},
});
