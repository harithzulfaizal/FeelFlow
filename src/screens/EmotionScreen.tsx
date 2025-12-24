import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	TouchableOpacity,
	Image,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SwipeCard } from "../components/SwipeCard";
import { ProgressBar } from "../components/ProgressBar";
import { ContextModal } from "../components/ContextModal";
import { SuccessToast } from "../components/SuccessToast";
import { Emotion, PLUTCHIK_EMOTIONS, getMaxDepth } from "../constants/emotions";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

const MAX_DEPTH = getMaxDepth(PLUTCHIK_EMOTIONS);

interface EmotionState {
	currentEmotions: Emotion[];
	currentIndex: number;
	path: Emotion[];
	depth: number;
}

interface Props {
	onNavigateToHistory: () => void;
	userId: string;
	userName: string;
	userImage?: string;
}

export default function EmotionScreen({
	onNavigateToHistory,
	userId,
	userName,
	userImage,
}: Props) {
	const { colors, mode, toggleTheme } = useTheme();
	const { signOut } = useAuth();
	const logSession = useMutation(api.emotions.logSession);

	const [state, setState] = useState<EmotionState>({
		currentEmotions: PLUTCHIK_EMOTIONS,
		currentIndex: 0,
		path: [],
		depth: 1,
	});

	const [showModal, setShowModal] = useState(false);
	const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
	const [showToast, setShowToast] = useState(false);
	const [toastEmotion, setToastEmotion] = useState<{
		name: string;
		color: string;
	} | null>(null);

	const currentEmotion = state.currentEmotions[state.currentIndex];
	const isLeaf =
		!currentEmotion?.children || currentEmotion.children.length === 0;

	const handleSwipeRight = useCallback(() => {
		if (!currentEmotion) return;

		const newPath = [...state.path, currentEmotion];

		if (isLeaf) {
			setSelectedEmotion(currentEmotion);
			setState((prev) => ({ ...prev, path: newPath }));
			setShowModal(true);
		} else {
			setState({
				currentEmotions: currentEmotion.children!,
				currentIndex: 0,
				path: newPath,
				depth: state.depth + 1,
			});
		}
	}, [currentEmotion, isLeaf, state.path, state.depth]);

	const handleSwipeLeft = useCallback(() => {
		const nextIndex = state.currentIndex + 1;
		if (nextIndex < state.currentEmotions.length) {
			setState((prev) => ({ ...prev, currentIndex: nextIndex }));
		} else {
			setState((prev) => ({ ...prev, currentIndex: 0 }));
		}
	}, [state.currentIndex, state.currentEmotions.length]);

	const handleModalSubmit = useCallback(
		async (intensity: number, trigger: string) => {
			if (!selectedEmotion) return;

			const emotionPath = state.path.map((e) => e.name);

			try {
				await logSession({
					userId,
					emotionPath,
					leafEmotion: selectedEmotion.name,
					intensity,
					trigger,
				});

				setToastEmotion({
					name: selectedEmotion.name,
					color: selectedEmotion.color,
				});
				setShowToast(true);
			} catch (error) {
				console.error("Failed to log session:", error);
			}

			setShowModal(false);
			handleReset();
		},
		[selectedEmotion, state.path, logSession, userId]
	);

	const handleModalClose = useCallback(() => {
		setShowModal(false);
		setSelectedEmotion(null);
		setState((prev) => ({
			...prev,
			path: prev.path.slice(0, -1),
		}));
	}, []);

	const handleReset = useCallback(() => {
		setState({
			currentEmotions: PLUTCHIK_EMOTIONS,
			currentIndex: 0,
			path: [],
			depth: 1,
		});
		setSelectedEmotion(null);
	}, []);

	if (!currentEmotion) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
			>
				<StatusBar
					barStyle={mode === "dark" ? "light-content" : "dark-content"}
				/>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.textSecondary }]}>
						No emotions to display
					</Text>
					<TouchableOpacity
						style={[
							styles.resetButton,
							{ backgroundColor: colors.surfaceElevated },
						]}
						onPress={handleReset}
					>
						<Text style={[styles.resetButtonText, { color: colors.text }]}>
							Reset
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<StatusBar
				barStyle={mode === "dark" ? "light-content" : "dark-content"}
			/>

			<View style={styles.header}>
				<TouchableOpacity
					onPress={onNavigateToHistory}
					style={styles.headerButton}
				>
					<Text style={styles.headerButtonText}>📅</Text>
				</TouchableOpacity>

				<View style={styles.titleContainer}>
					<Text style={[styles.title, { color: colors.text }]}>FeelFlow</Text>
					<ProgressBar currentDepth={state.depth} maxDepth={MAX_DEPTH} />
				</View>

				<TouchableOpacity onPress={() => signOut()} style={styles.avatarButton}>
					{userImage ? (
						<Image source={{ uri: userImage }} style={styles.avatar} />
					) : (
						<View
							style={[
								styles.avatarPlaceholder,
								{ backgroundColor: colors.surfaceElevated },
							]}
						>
							<Text style={[styles.avatarText, { color: colors.text }]}>
								{userName.charAt(0).toUpperCase()}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>

			<View style={styles.themeRow}>
				<TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
					<Text style={[styles.themeText, { color: colors.textMuted }]}>
						{mode === "dark" ? "☀️ Light" : "🌙 Dark"}
					</Text>
				</TouchableOpacity>
			</View>

			{state.path.length > 0 && (
				<View style={styles.pathContainer}>
					<Text style={[styles.pathText, { color: colors.textSecondary }]}>
						{state.path.map((e) => e.name).join(" → ")}
					</Text>
				</View>
			)}

			<View style={styles.cardContainer}>
				<SwipeCard
					key={`${currentEmotion.id}-${state.currentIndex}`}
					emotion={currentEmotion}
					onSwipeRight={handleSwipeRight}
					onSwipeLeft={handleSwipeLeft}
					isLeaf={isLeaf}
					currentIndex={state.currentIndex}
					totalCount={state.currentEmotions.length}
				/>
			</View>

			<View style={styles.instructions}>
				<View style={styles.instructionItem}>
					<Text style={[styles.arrow, { color: colors.textMuted }]}>←</Text>
					<Text style={[styles.instructionText, { color: colors.textMuted }]}>
						Skip
					</Text>
				</View>
				<View style={styles.instructionItem}>
					<Text style={[styles.instructionText, { color: colors.textMuted }]}>
						{isLeaf ? "Select" : "Explore"}
					</Text>
					<Text style={[styles.arrow, { color: colors.textMuted }]}>→</Text>
				</View>
			</View>

			{selectedEmotion && (
				<ContextModal
					visible={showModal}
					emotion={selectedEmotion.name}
					emotionColor={selectedEmotion.color}
					onSubmit={handleModalSubmit}
					onClose={handleModalClose}
				/>
			)}

			{toastEmotion && (
				<SuccessToast
					visible={showToast}
					emotion={toastEmotion.name}
					emotionColor={toastEmotion.color}
					onDismiss={() => {
						setShowToast(false);
						setToastEmotion(null);
					}}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.md,
		paddingTop: spacing.md,
		paddingBottom: spacing.xs,
	},
	headerButton: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	headerButtonText: {
		fontSize: 24,
	},
	avatarButton: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
	},
	avatarPlaceholder: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.bold,
	},
	titleContainer: {
		alignItems: "center",
		gap: spacing.xs,
	},
	title: {
		fontSize: typography.sizes.lg,
		fontWeight: typography.weights.bold,
		letterSpacing: 2,
	},
	themeRow: {
		alignItems: "center",
		paddingBottom: spacing.xs,
	},
	themeButton: {
		padding: spacing.xs,
	},
	themeText: {
		fontSize: typography.sizes.xs,
	},
	pathContainer: {
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.xs,
	},
	pathText: {
		fontSize: typography.sizes.sm,
		textAlign: "center",
	},
	cardContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	instructions: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: spacing.xxl,
		paddingBottom: spacing.lg,
	},
	instructionItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	arrow: {
		fontSize: typography.sizes.xl,
		fontWeight: typography.weights.bold,
	},
	instructionText: {
		fontSize: typography.sizes.sm,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: typography.sizes.md,
		marginBottom: spacing.lg,
	},
	resetButton: {
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md,
		borderRadius: 999,
	},
	resetButtonText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
	},
});
