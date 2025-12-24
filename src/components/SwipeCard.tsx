import React, { useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	PanResponder,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { Emotion } from "../constants/emotions";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.2;
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_HEIGHT = 380;

interface SwipeCardProps {
	emotion: Emotion;
	onSwipeRight: () => void;
	onSwipeLeft: () => void;
	isLeaf: boolean;
	currentIndex: number;
	totalCount: number;
}

export function SwipeCard({
	emotion,
	onSwipeRight,
	onSwipeLeft,
	isLeaf,
	currentIndex,
	totalCount,
}: SwipeCardProps) {
	const { colors } = useTheme();
	const position = useRef(new Animated.ValueXY()).current;
	const [showDefinition, setShowDefinition] = useState(false);

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy * 0.2 });
			},
			onPanResponderRelease: (_, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					swipeRight();
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					swipeLeft();
				} else {
					resetPosition();
				}
			},
		})
	).current;

	const swipeRight = () => {
		Animated.timing(position, {
			toValue: { x: SCREEN_WIDTH + 100, y: 0 },
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			position.setValue({ x: 0, y: 0 });
			setShowDefinition(false);
			onSwipeRight();
		});
	};

	const swipeLeft = () => {
		Animated.timing(position, {
			toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			position.setValue({ x: 0, y: 0 });
			setShowDefinition(false);
			onSwipeLeft();
		});
	};

	const resetPosition = () => {
		Animated.spring(position, {
			toValue: { x: 0, y: 0 },
			friction: 6,
			tension: 100,
			useNativeDriver: true,
		}).start();
	};

	const rotate = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: ["-8deg", "0deg", "8deg"],
		extrapolate: "clamp",
	});

	const leftOpacity = position.x.interpolate({
		inputRange: [-SWIPE_THRESHOLD, 0],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});

	const rightOpacity = position.x.interpolate({
		inputRange: [0, SWIPE_THRESHOLD],
		outputRange: [0, 1],
		extrapolate: "clamp",
	});

	const cardStyle = {
		transform: [
			{ translateX: position.x },
			{ translateY: position.y },
			{ rotate },
		],
	};

	const toggleDefinition = () => {
		setShowDefinition(!showDefinition);
	};

	return (
		<View style={styles.cardStack}>
			{/* Background cards for stack effect */}
			{totalCount > 1 && (
				<>
					<View
						style={[
							styles.stackCard,
							styles.stackCard2,
							{ backgroundColor: colors.surfaceElevated },
						]}
					/>
					<View
						style={[
							styles.stackCard,
							styles.stackCard1,
							{ backgroundColor: colors.surface },
						]}
					/>
				</>
			)}

			<Animated.View
				{...panResponder.panHandlers}
				style={[
					styles.card,
					cardStyle,
					{ backgroundColor: colors.surface },
					{
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 8 },
						shadowOpacity: 0.3,
						shadowRadius: 16,
						elevation: 8,
					},
				]}
			>
				<View
					style={[styles.colorAccent, { backgroundColor: emotion.color }]}
				/>

				{/* Card counter */}
				<View style={styles.counterContainer}>
					<Text style={[styles.counter, { color: colors.textMuted }]}>
						{currentIndex + 1} of {totalCount}
					</Text>
				</View>

				<View style={styles.content}>
					<TouchableOpacity
						onPress={toggleDefinition}
						activeOpacity={0.8}
						style={[styles.emotionCircle, { backgroundColor: emotion.color }]}
					>
						<Text style={styles.emotionIcon}>{getEmotionIcon(emotion.id)}</Text>
					</TouchableOpacity>

					<Text style={[styles.emotionName, { color: colors.text }]}>
						{emotion.name}
					</Text>

					{showDefinition ? (
						<View style={styles.definitionContainer}>
							<Text
								style={[styles.definition, { color: colors.textSecondary }]}
							>
								{emotion.definition}
							</Text>
							<Text style={[styles.tapHint, { color: colors.textMuted }]}>
								Tap circle to hide
							</Text>
						</View>
					) : (
						<View style={styles.hintContainer}>
							<Text style={[styles.hint, { color: colors.textSecondary }]}>
								{isLeaf ? "Swipe right to select" : "Swipe to explore"}
							</Text>
							<Text style={[styles.tapHint, { color: colors.textMuted }]}>
								Tap circle for definition
							</Text>
						</View>
					)}
				</View>

				<Animated.View
					style={[
						styles.actionLabel,
						styles.skip,
						{ opacity: leftOpacity, borderColor: colors.textSecondary },
					]}
				>
					<Text style={[styles.actionText, { color: colors.textSecondary }]}>
						SKIP
					</Text>
				</Animated.View>

				<Animated.View
					style={[
						styles.actionLabel,
						styles.select,
						{ opacity: rightOpacity, borderColor: colors.success },
					]}
				>
					<Text style={[styles.actionText, { color: emotion.color }]}>
						{isLeaf ? "SELECT" : "EXPLORE"}
					</Text>
				</Animated.View>
			</Animated.View>
		</View>
	);
}

function getEmotionIcon(id: string): string {
	const icons: Record<string, string> = {
		happy: "😊",
		sad: "😢",
		disgusted: "🤢",
		angry: "😠",
		fearful: "😰",
		bad: "😞",
		surprised: "😮",
		playful: "🎮",
		content: "😌",
		interested: "🧐",
		proud: "😤",
		accepted: "🤗",
		powerful: "💪",
		peaceful: "☮️",
		trusting: "🤝",
		optimistic: "✨",
		aroused: "🔥",
		cheeky: "😏",
		free: "🦋",
		joyful: "🌟",
		curious: "🔍",
		inquisitive: "❓",
		successful: "🏆",
		confident: "😎",
		respected: "👑",
		valued: "💎",
		courageous: "🦁",
		creative: "🎨",
		loving: "❤️",
		thankful: "🙏",
		sensitive: "🌸",
		intimate: "💕",
		hopeful: "🌈",
		inspired: "💡",
		lonely: "🥺",
		vulnerable: "🛡️",
		despair: "😩",
		guilty: "😔",
		depressed: "😞",
		hurt: "💔",
		isolated: "🏝️",
		abandoned: "🚪",
		victimised: "😣",
		fragile: "🥀",
		grief: "🖤",
		powerless: "😶",
		ashamed: "😳",
		remorseful: "🙇",
		empty: "🕳️",
		inferior: "📉",
		disappointed: "😕",
		embarrassed: "🫣",
		disapproving: "👎",
		disappointed_d: "😞",
		awful: "😖",
		repelled: "🤮",
		judgemental: "⚖️",
		embarrassed_d: "😳",
		appalled: "😧",
		revolted: "🤢",
		nauseated: "🤮",
		detestable: "💀",
		horrified: "😱",
		hesitant: "🤔",
		letdown: "😤",
		humiliated: "😓",
		bitter: "😒",
		mad: "😡",
		aggressive: "👊",
		frustrated: "😤",
		distant: "🧊",
		critical: "🔎",
		betrayed: "🗡️",
		resentful: "😾",
		disrespected: "🚫",
		ridiculed: "🤡",
		indignant: "😤",
		violated: "⚠️",
		furious: "🔥",
		jealous: "💚",
		provoked: "⚡",
		hostile: "👿",
		infuriated: "🌋",
		annoyed: "😒",
		withdrawn: "🐚",
		numb: "🧊",
		sceptical: "🤨",
		dismissive: "🙄",
		scared: "😨",
		anxious: "😰",
		insecure: "😟",
		weak: "😩",
		rejected: "🚷",
		threatened: "⚡",
		helpless: "🆘",
		frightened: "😱",
		overwhelmed: "🌊",
		worried: "😧",
		inadequate: "📉",
		inferior_f: "⬇️",
		worthless: "💔",
		insignificant: "🔹",
		excluded: "🚫",
		persecuted: "🎯",
		nervous: "😬",
		exposed: "🔦",
		bored: "😑",
		busy: "🏃",
		stressed: "😫",
		tired: "😴",
		indifferent: "😐",
		apathetic: "🫥",
		pressured: "⏰",
		rushed: "🏃‍♂️",
		overwhelmed_b: "😵",
		outofcontrol: "🌀",
		sleepy: "💤",
		unfocused: "🌫️",
		startled: "😲",
		confused: "😵‍💫",
		amazed: "🤩",
		excited: "🎉",
		shocked: "⚡",
		dismayed: "😦",
		disillusioned: "💭",
		perplexed: "🤔",
		astonished: "😲",
		awe: "✨",
		eager: "🤩",
		energetic: "⚡",
	};
	return icons[id] || "💭";
}

const styles = StyleSheet.create({
	cardStack: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT + 20,
		alignItems: "center",
		justifyContent: "center",
	},
	stackCard: {
		position: "absolute",
		width: CARD_WIDTH - 20,
		height: CARD_HEIGHT,
		borderRadius: borderRadius.lg,
	},
	stackCard2: {
		top: 10,
		opacity: 0.3,
	},
	stackCard1: {
		top: 5,
		opacity: 0.6,
		width: CARD_WIDTH - 10,
	},
	card: {
		position: "absolute",
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		borderRadius: borderRadius.lg,
		overflow: "hidden",
	},
	colorAccent: {
		height: 6,
		width: "100%",
	},
	counterContainer: {
		position: "absolute",
		top: spacing.lg,
		alignSelf: "center",
	},
	counter: {
		fontSize: typography.sizes.sm,
		fontWeight: typography.weights.medium,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.lg,
	},
	emotionCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	emotionIcon: {
		fontSize: 48,
	},
	emotionName: {
		fontSize: typography.sizes.xl,
		fontWeight: typography.weights.bold,
		marginBottom: spacing.sm,
	},
	hintContainer: {
		alignItems: "center",
		gap: spacing.xs,
	},
	hint: {
		fontSize: typography.sizes.sm,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	tapHint: {
		fontSize: typography.sizes.xs,
		marginTop: spacing.xs,
	},
	definitionContainer: {
		alignItems: "center",
		paddingHorizontal: spacing.md,
	},
	definition: {
		fontSize: typography.sizes.md,
		textAlign: "center",
		fontStyle: "italic",
		lineHeight: 22,
	},
	actionLabel: {
		position: "absolute",
		top: spacing.xl,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.sm,
		borderWidth: 2,
	},
	skip: {
		right: spacing.md,
	},
	select: {
		left: spacing.md,
	},
	actionText: {
		fontSize: typography.sizes.sm,
		fontWeight: typography.weights.bold,
		letterSpacing: 2,
	},
});
