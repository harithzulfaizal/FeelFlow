import { StyleSheet } from "react-native";

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
	background: string;
	surface: string;
	surfaceElevated: string;
	text: string;
	textSecondary: string;
	textMuted: string;
	border: string;
	accent: string;
	success: string;
	overlay: string;
}

export const lightColors: ThemeColors = {
	background: "#F8F9FA",
	surface: "#FFFFFF",
	surfaceElevated: "#F1F3F4",
	text: "#1A1A1C",
	textSecondary: "#5F6368",
	textMuted: "#9AA0A6",
	border: "#E8EAED",
	accent: "#FF6B6B",
	success: "#4ECDC4",
	overlay: "rgba(0, 0, 0, 0.5)",
};

export const darkColors: ThemeColors = {
	background: "#0A0A0B",
	surface: "#1A1A1C",
	surfaceElevated: "#252528",
	text: "#FFFFFF",
	textSecondary: "#A0A0A0",
	textMuted: "#6B6B6B",
	border: "#2A2A2D",
	accent: "#FF6B6B",
	success: "#4ECDC4",
	overlay: "rgba(0, 0, 0, 0.7)",
};

export const getColors = (mode: ThemeMode): ThemeColors => {
	return mode === "light" ? lightColors : darkColors;
};

export const colors = darkColors;

export const typography = {
	fontFamily: "System",
	sizes: {
		xl: 32,
		lg: 24,
		md: 18,
		sm: 14,
		xs: 12,
	},
	weights: {
		regular: "400" as const,
		medium: "500" as const,
		semibold: "600" as const,
		bold: "700" as const,
	},
};

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

export const borderRadius = {
	sm: 8,
	md: 16,
	lg: 24,
	full: 9999,
};

export const shadows = StyleSheet.create({
	card: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 16,
		elevation: 8,
	},
	modal: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 16 },
		shadowOpacity: 0.4,
		shadowRadius: 24,
		elevation: 16,
	},
});
