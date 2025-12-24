import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

interface Props {
	visible: boolean;
	emotion: string;
	emotionColor: string;
	onDismiss: () => void;
}

export function SuccessToast({
	visible,
	emotion,
	emotionColor,
	onDismiss,
}: Props) {
	const { colors } = useTheme();
	const opacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		if (visible) {
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.delay(2000),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start(() => onDismiss());
		}
	}, [visible]);

	if (!visible) return null;

	return (
		<Animated.View
			style={[styles.toast, { opacity, backgroundColor: colors.surface }]}
		>
			<View style={[styles.indicator, { backgroundColor: emotionColor }]} />
			<View style={styles.content}>
				<Text style={[styles.title, { color: colors.text }]}>
					Session Logged ✓
				</Text>
				<Text style={[styles.subtitle, { color: colors.textSecondary }]}>
					Feeling {emotion} recorded
				</Text>
			</View>
			<TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
				<Text style={[styles.dismiss, { color: colors.textMuted }]}>×</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	toast: {
		position: "absolute",
		top: 60,
		left: spacing.lg,
		right: spacing.lg,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: borderRadius.md,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
		overflow: "hidden",
	},
	indicator: {
		width: 4,
		alignSelf: "stretch",
	},
	content: {
		flex: 1,
		padding: spacing.md,
	},
	title: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
	},
	subtitle: {
		fontSize: typography.sizes.sm,
		marginTop: spacing.xs,
	},
	dismissButton: {
		padding: spacing.md,
	},
	dismiss: {
		fontSize: 24,
		fontWeight: typography.weights.bold,
	},
});
