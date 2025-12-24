import React, { useState, useMemo } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

interface Props {
	onBack: () => void;
	userId: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function HistoryScreen({ onBack, userId }: Props) {
	const { colors, mode } = useTheme();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;

	const sessions = useQuery(api.emotions.getSessionsByMonth, {
		userId,
		year,
		month,
	});

	const sessionsByDay = useMemo(() => {
		if (!sessions) return {};
		return sessions.reduce((acc: Record<string, typeof sessions>, session) => {
			const day = new Date(session.timestamp).getDate().toString();
			if (!acc[day]) acc[day] = [];
			acc[day].push(session);
			return acc;
		}, {});
	}, [sessions]);

	const calendarDays = useMemo(() => {
		const firstDay = new Date(year, month - 1, 1).getDay();
		const daysInMonth = new Date(year, month, 0).getDate();
		const days: (number | null)[] = [];

		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let i = 1; i <= daysInMonth; i++) days.push(i);

		return days;
	}, [year, month]);

	const goToPreviousMonth = () => {
		setCurrentDate(new Date(year, month - 2, 1));
		setSelectedDate(null);
	};

	const goToNextMonth = () => {
		setCurrentDate(new Date(year, month, 1));
		setSelectedDate(null);
	};

	const formatTime = (timestamp: string) => {
		return new Date(timestamp).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getIntensityColor = (intensity: number) => {
		if (intensity <= 3) return "#4CAF50";
		if (intensity <= 6) return "#FFC107";
		return "#F44336";
	};

	const selectedSessions = selectedDate
		? sessionsByDay[selectedDate] || []
		: [];

	const renderSession = ({ item }: { item: any }) => (
		<View
			style={[
				styles.sessionCard,
				{ backgroundColor: colors.surface, borderColor: colors.border },
			]}
		>
			<View style={styles.sessionHeader}>
				<Text style={[styles.sessionTime, { color: colors.textSecondary }]}>
					{formatTime(item.timestamp)}
				</Text>
				<View
					style={[
						styles.intensityBadge,
						{ backgroundColor: getIntensityColor(item.intensity) },
					]}
				>
					<Text style={styles.intensityText}>{item.intensity}</Text>
				</View>
			</View>
			<Text style={[styles.leafEmotion, { color: colors.text }]}>
				{item.leafEmotion}
			</Text>
			<Text style={[styles.pathText, { color: colors.textMuted }]}>
				{item.emotionPath.join(" → ")}
			</Text>
			{item.trigger && (
				<Text style={[styles.triggerText, { color: colors.textSecondary }]}>
					"{item.trigger}"
				</Text>
			)}
		</View>
	);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<StatusBar
				barStyle={mode === "dark" ? "light-content" : "dark-content"}
			/>

			<View style={styles.header}>
				<TouchableOpacity onPress={onBack} style={styles.backButton}>
					<Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
				</TouchableOpacity>
				<Text style={[styles.title, { color: colors.text }]}>History</Text>
				<View style={styles.placeholder} />
			</View>

			{/* Calendar Navigation */}
			<View style={styles.calendarNav}>
				<TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
					<Text style={[styles.navText, { color: colors.text }]}>‹</Text>
				</TouchableOpacity>
				<Text style={[styles.monthTitle, { color: colors.text }]}>
					{MONTHS[month - 1]} {year}
				</Text>
				<TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
					<Text style={[styles.navText, { color: colors.text }]}>›</Text>
				</TouchableOpacity>
			</View>

			{/* Weekday Headers */}
			<View style={styles.weekdayRow}>
				{WEEKDAYS.map((day) => (
					<Text
						key={day}
						style={[styles.weekdayText, { color: colors.textMuted }]}
					>
						{day}
					</Text>
				))}
			</View>

			{/* Calendar Grid */}
			<View style={styles.calendarGrid}>
				{calendarDays.map((day, index) => {
					const hasSessions = day && sessionsByDay[day.toString()];
					const isSelected = selectedDate === day?.toString();

					return (
						<TouchableOpacity
							key={index}
							style={[
								styles.dayCell,
								hasSessions && styles.dayCellWithSession,
								isSelected && { backgroundColor: colors.accent },
							]}
							onPress={() => day && setSelectedDate(day.toString())}
							disabled={!day}
						>
							{day && (
								<>
									<Text
										style={[
											styles.dayText,
											{ color: isSelected ? "#FFF" : colors.text },
										]}
									>
										{day}
									</Text>
									{hasSessions && !isSelected && (
										<View
											style={[
												styles.sessionDot,
												{ backgroundColor: colors.success },
											]}
										/>
									)}
								</>
							)}
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Selected Day Sessions */}
			{selectedDate && (
				<View style={styles.sessionsContainer}>
					<Text style={[styles.selectedDateTitle, { color: colors.text }]}>
						{MONTHS[month - 1]} {selectedDate}, {year}
					</Text>
					{selectedSessions.length === 0 ? (
						<Text style={[styles.noSessions, { color: colors.textSecondary }]}>
							No sessions on this day
						</Text>
					) : (
						<FlatList
							data={selectedSessions}
							renderItem={renderSession}
							keyExtractor={(item) => item._id}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			)}

			{!selectedDate && (
				<View style={styles.hintContainer}>
					<Text style={[styles.hintText, { color: colors.textSecondary }]}>
						Tap a day to view sessions
					</Text>
				</View>
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
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
	},
	backButton: {
		padding: spacing.sm,
	},
	backText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.medium,
	},
	title: {
		fontSize: typography.sizes.lg,
		fontWeight: typography.weights.bold,
	},
	placeholder: {
		width: 60,
	},
	calendarNav: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md,
	},
	navButton: {
		padding: spacing.sm,
	},
	navText: {
		fontSize: 28,
		fontWeight: typography.weights.bold,
	},
	monthTitle: {
		fontSize: typography.sizes.lg,
		fontWeight: typography.weights.semibold,
	},
	weekdayRow: {
		flexDirection: "row",
		paddingHorizontal: spacing.md,
	},
	weekdayText: {
		flex: 1,
		textAlign: "center",
		fontSize: typography.sizes.xs,
		fontWeight: typography.weights.medium,
		paddingVertical: spacing.sm,
	},
	calendarGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: spacing.md,
	},
	dayCell: {
		width: `${100 / 7}%`,
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: borderRadius.sm,
	},
	dayCellWithSession: {},
	dayText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.medium,
	},
	sessionDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		marginTop: 2,
	},
	sessionsContainer: {
		flex: 1,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
	},
	selectedDateTitle: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
		marginBottom: spacing.md,
	},
	noSessions: {
		fontSize: typography.sizes.sm,
		textAlign: "center",
		marginTop: spacing.lg,
	},
	sessionCard: {
		borderRadius: borderRadius.md,
		padding: spacing.md,
		borderWidth: 1,
		marginBottom: spacing.sm,
	},
	sessionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.xs,
	},
	sessionTime: {
		fontSize: typography.sizes.sm,
	},
	intensityBadge: {
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	intensityText: {
		color: "#FFF",
		fontSize: typography.sizes.sm,
		fontWeight: typography.weights.bold,
	},
	leafEmotion: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
	},
	pathText: {
		fontSize: typography.sizes.xs,
		marginTop: spacing.xs,
	},
	triggerText: {
		fontSize: typography.sizes.sm,
		fontStyle: "italic",
		marginTop: spacing.sm,
	},
	hintContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	hintText: {
		fontSize: typography.sizes.md,
	},
});
