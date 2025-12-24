import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	Image,
} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "../context/ThemeContext";
import { typography, spacing, borderRadius } from "../styles/theme";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
	const { colors, mode } = useTheme();
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const handleGoogleLogin = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();
			if (createdSessionId && setActive) {
				await setActive({ session: createdSessionId });
			}
		} catch (err) {
			console.error("OAuth error:", err);
		}
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<StatusBar
				barStyle={mode === "dark" ? "light-content" : "dark-content"}
			/>

			<View style={styles.content}>
				<View style={styles.logoContainer}>
					<Text style={styles.logoEmoji}>🌊</Text>
					<Text style={[styles.title, { color: colors.text }]}>FeelFlow</Text>
					<Text style={[styles.subtitle, { color: colors.textSecondary }]}>
						Discover your emotions
					</Text>
				</View>

				<View style={styles.featuresContainer}>
					<View style={styles.feature}>
						<Text style={styles.featureEmoji}>🎯</Text>
						<Text style={[styles.featureText, { color: colors.textSecondary }]}>
							Swipe through emotions
						</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureEmoji}>📊</Text>
						<Text style={[styles.featureText, { color: colors.textSecondary }]}>
							Track your patterns
						</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureEmoji}>📅</Text>
						<Text style={[styles.featureText, { color: colors.textSecondary }]}>
							View your history
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.googleButton, { backgroundColor: colors.surface }]}
					onPress={handleGoogleLogin}
					activeOpacity={0.8}
				>
					<Text style={styles.googleIcon}>G</Text>
					<Text style={[styles.googleButtonText, { color: colors.text }]}>
						Continue with Google
					</Text>
				</TouchableOpacity>

				<Text style={[styles.disclaimer, { color: colors.textMuted }]}>
					Your data is private and secure
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.xl,
	},
	logoContainer: {
		alignItems: "center",
		marginBottom: spacing.xxl,
	},
	logoEmoji: {
		fontSize: 72,
		marginBottom: spacing.md,
	},
	title: {
		fontSize: 40,
		fontWeight: typography.weights.bold,
		letterSpacing: 2,
	},
	subtitle: {
		fontSize: typography.sizes.lg,
		marginTop: spacing.sm,
	},
	featuresContainer: {
		marginBottom: spacing.xxl,
		gap: spacing.md,
	},
	feature: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	featureEmoji: {
		fontSize: 24,
	},
	featureText: {
		fontSize: typography.sizes.md,
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.xl,
		borderRadius: borderRadius.full,
		gap: spacing.md,
		width: "100%",
		maxWidth: 300,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 4,
	},
	googleIcon: {
		fontSize: 20,
		fontWeight: typography.weights.bold,
		color: "#4285F4",
	},
	googleButtonText: {
		fontSize: typography.sizes.md,
		fontWeight: typography.weights.semibold,
	},
	disclaimer: {
		fontSize: typography.sizes.sm,
		marginTop: spacing.lg,
	},
});
