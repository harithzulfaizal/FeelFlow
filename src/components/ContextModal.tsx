import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Modal,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

interface ContextModalProps {
	visible: boolean;
	emotion: string;
	emotionColor: string;
	onSubmit: (intensity: number, trigger: string) => void;
	onClose: () => void;
}

export function ContextModal({
	visible,
	emotion,
	emotionColor,
	onSubmit,
	onClose,
}: ContextModalProps) {
	const { colors } = useTheme();
	const [intensity, setIntensity] = useState(5);
	const [trigger, setTrigger] = useState("");

	const handleSubmit = () => {
		onSubmit(intensity, trigger);
		setIntensity(5);
		setTrigger("");
	};

	const intensityLabels = ["Low", "Medium", "High", "Intense"];
	const getIntensityLabel = (val: number) => {
		if (val <= 3) return intensityLabels[0];
		if (val <= 5) return intensityLabels[1];
		if (val <= 7) return intensityLabels[2];
		return intensityLabels[3];
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={[styles.overlay, { backgroundColor: colors.overlay }]}
			>
				<View style={[styles.modal, { backgroundColor: colors.surface }]}>
					<View style={styles.header}>
						<View
							style={[styles.emotionBadge, { backgroundColor: emotionColor }]}
						>
							<Text
								style={[styles.emotionBadgeText, { color: colors.background }]}
							>
								{emotion}
							</Text>
						</View>
						<Text style={[styles.title, { color: colors.text }]}>
							How are you feeling?
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.label, { color: colors.textSecondary }]}>
							Intensity
						</Text>
						<View style={styles.intensityContainer}>
							<View style={styles.sliderTrack}>
								{[...Array(10)].map((_, i) => (
									<TouchableOpacity
										key={i}
										onPress={() => setIntensity(i + 1)}
										style={[
											styles.sliderDot,
											{ backgroundColor: colors.border },
											i < intensity && {
												backgroundColor: emotionColor,
												transform: [{ scale: i === intensity - 1 ? 1.3 : 1 }],
											},
										]}
									/>
								))}
							</View>
							<View style={styles.intensityLabels}>
								<Text style={[styles.intensityValue, { color: colors.text }]}>
									{intensity}
								</Text>
								<Text
									style={[
										styles.intensityLabel,
										{ color: colors.textSecondary },
									]}
								>
									{getIntensityLabel(intensity)}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={[styles.label, { color: colors.textSecondary }]}>
							What triggered this?
						</Text>
						<TextInput
							style={[
								styles.textInput,
								{ backgroundColor: colors.surfaceElevated, color: colors.text },
							]}
							placeholder="Describe what happened..."
							placeholderTextColor={colors.textMuted}
							value={trigger}
							onChangeText={setTrigger}
							multiline
							maxLength={200}
						/>
					</View>

					<View style={styles.buttons}>
						<TouchableOpacity
							style={[styles.cancelButton, { borderColor: colors.border }]}
							onPress={onClose}
						>
							<Text
								style={[
									styles.cancelButtonText,
									{ color: colors.textSecondary },
								]}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.submitButton, { backgroundColor: emotionColor }]}
							onPress={handleSubmit}
						>
							<Text style={styles.submitButtonText}>Log Feeling</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.lg,
	},
	modal: {
		width: "100%",
		maxWidth: 400,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 16 },
		shadowOpacity: 0.4,
		shadowRadius: 24,
		elevation: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	emotionBadge: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.full,
		marginBottom: spacing.md,
	},
	emotionBadgeText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.bold,
	},
	title: {
		fontSize: typography.sizes.lg,
		fontWeight: typography.weights.semibold,
	},
	section: {
		marginBottom: spacing.lg,
	},
	label: {
		fontSize: typography.sizes.sm,
		fontWeight: typography.weights.medium,
		marginBottom: spacing.sm,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	intensityContainer: {
		gap: spacing.md,
	},
	sliderTrack: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: spacing.sm,
	},
	sliderDot: {
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	intensityLabels: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	intensityValue: {
		fontSize: typography.sizes.xl,
		fontWeight: typography.weights.bold,
	},
	intensityLabel: {
		fontSize: typography.sizes.md,
	},
	textInput: {
		borderRadius: borderRadius.md,
		padding: spacing.md,
		fontSize: typography.sizes.md,
		minHeight: 80,
		textAlignVertical: "top",
	},
	buttons: {
		flexDirection: "row",
		gap: spacing.md,
	},
	cancelButton: {
		flex: 1,
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		borderWidth: 1,
		alignItems: "center",
	},
	cancelButtonText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
	},
	submitButton: {
		flex: 2,
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		alignItems: "center",
	},
	submitButtonText: {
		color: "#000000",
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.bold,
	},
});
