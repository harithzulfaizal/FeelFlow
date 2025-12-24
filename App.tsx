import React, { useState } from "react";
import {
	ClerkProvider,
	ClerkLoaded,
	useAuth,
	useUser,
} from "@clerk/clerk-expo";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { tokenCache } from "./src/utils/tokenCache";
import EmotionScreen from "./src/screens/EmotionScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import LoginScreen from "./src/screens/LoginScreen";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

type Screen = "emotion" | "history";

function AuthenticatedApp() {
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	const [currentScreen, setCurrentScreen] = useState<Screen>("emotion");

	if (!isSignedIn) {
		return <LoginScreen />;
	}

	const userId = user?.id || "";
	const userName =
		user?.firstName || user?.emailAddresses[0]?.emailAddress || "User";
	const userImage = user?.imageUrl;

	return (
		<>
			{currentScreen === "emotion" ? (
				<EmotionScreen
					onNavigateToHistory={() => setCurrentScreen("history")}
					userId={userId}
					userName={userName}
					userImage={userImage}
				/>
			) : (
				<HistoryScreen
					onBack={() => setCurrentScreen("emotion")}
					userId={userId}
				/>
			)}
		</>
	);
}

export default function App() {
	return (
		<ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<ConvexProvider client={convex}>
					<ThemeProvider>
						<AuthenticatedApp />
					</ThemeProvider>
				</ConvexProvider>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
