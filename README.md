# FeelFlow 🌊

**Discover your emotions through an intuitive swipe-based interface**

FeelFlow is a React Native mobile application designed to help users explore, identify, and track their emotions using the Plutchik Wheel of Emotions model. With a Tinder-style swipe interface, users can navigate through a hierarchical emotion tree to pinpoint their exact feelings, log the intensity and triggers, and review their emotional history over time.

---

## 📋 Table of Contents

- [Code Structure / Architecture](#code-structure--architecture)
- [How to Use / Start / Run the Project](#how-to-use--start--run-the-project)
- [Data Sources Integrated](#data-sources-integrated)
- [Expected Outcomes](#expected-outcomes)

---

## Code Structure / Architecture

### Directory Structure

```
FeelFlow/
├── App.tsx                 # Main application entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── index.ts                # App registration
├── convex/                 # Backend (Convex) configuration
│   ├── schema.ts           # Database schema definitions
│   ├── emotions.ts         # Emotion-related mutations/queries
│   └── _generated/         # Auto-generated Convex types
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── SwipeCard.tsx   # Swipeable emotion card
│   │   ├── ContextModal.tsx # Intensity/trigger input modal
│   │   ├── ProgressBar.tsx # Depth progress indicator
│   │   └── SuccessToast.tsx # Success feedback toast
│   ├── screens/            # Application screens
│   │   ├── LoginScreen.tsx # Google OAuth login
│   │   ├── EmotionScreen.tsx # Main emotion selection
│   │   └── HistoryScreen.tsx # Calendar view of past sessions
│   ├── constants/
│   │   └── emotions.ts     # Plutchik emotion tree data
│   ├── context/
│   │   └── ThemeContext.tsx # Light/dark theme provider
│   ├── styles/
│   │   └── theme.ts        # Design system (colors, typography, spacing)
│   └── utils/
│       └── tokenCache.ts   # Secure token storage for auth
└── assets/                 # App icons and splash images
```

### Major Components

| Component         | Purpose                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| **App.tsx**       | Root component wrapping ClerkProvider (auth), ConvexProvider (backend), and ThemeProvider (theming)   |
| **SwipeCard**     | Interactive card with pan gesture handling for swiping left (skip) or right (select/explore emotions) |
| **ContextModal**  | Modal dialog for capturing emotion intensity (1-10 scale) and optional trigger description            |
| **EmotionScreen** | Main screen managing emotion navigation state, card rendering, and session logging                    |
| **HistoryScreen** | Calendar-based view for reviewing past emotion sessions by month                                      |
| **LoginScreen**   | OAuth login screen with Google sign-in via Clerk                                                      |

### Patterns & Frameworks

| Technology              | Purpose                                                         |
| ----------------------- | --------------------------------------------------------------- |
| **React Native + Expo** | Cross-platform mobile development (iOS, Android, Web)           |
| **Clerk**               | Authentication (Google OAuth) with secure token caching         |
| **Convex**              | Real-time backend-as-a-service for data persistence and queries |
| **React Context**       | Theme state management (light/dark mode)                        |
| **Animated API**        | Smooth swipe gestures and card transitions                      |
| **PanResponder**        | Touch gesture detection for swipe interactions                  |

### Key Design Decisions

1. **Hierarchical Emotion Model**: Uses Plutchik's Wheel of Emotions with 3-level depth (7 primary → secondary → tertiary emotions)
2. **Swipe-Based Navigation**: Tinder-style UX for intuitive emotion exploration
3. **User-Scoped Data**: All emotion sessions are indexed by `userId` for privacy
4. **Real-time Sync**: Convex provides automatic real-time updates across devices

---

## How to Use / Start / Run the Project

### Prerequisites

- **Node.js** v20+ (use `nvm` for version management)
- **Bun** runtime (or npm/yarn)
- **Expo CLI** (installed via npx)
- **Convex Account** ([convex.dev](https://convex.dev)) for backend
- **Clerk Account** ([clerk.com](https://clerk.com)) for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/FeelFlow.git
   cd FeelFlow
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   CONVEX_DEPLOYMENT=your-convex-deployment-name
   EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-key
   ```

4. **Initialize Convex backend**
   ```bash
   npx convex dev
   ```
   This will:
   - Prompt you to log in to Convex (first time)
   - Deploy the schema and functions defined in `/convex`
   - Start watching for changes

### Running the Project

| Platform                      | Command                                         |
| ----------------------------- | ----------------------------------------------- |
| **iOS Simulator**             | `bun run ios` or `npx expo start --ios`         |
| **Android Emulator**          | `bun run android` or `npx expo start --android` |
| **Web Browser**               | `bun run web` or `npx expo start --web`         |
| **Expo Go (physical device)** | `bun run start` → Scan QR code with Expo Go app |

### Available Scripts

```bash
bun run start    # Start Expo development server
bun run ios      # Run on iOS simulator
bun run android  # Run on Android emulator
bun run web      # Run in web browser
```

### Troubleshooting

| Issue                          | Solution                                                              |
| ------------------------------ | --------------------------------------------------------------------- |
| **Convex connection error**    | Ensure `npx convex dev` is running in a separate terminal             |
| **Clerk auth not working**     | Verify `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is correct in `.env.local` |
| **Web support missing**        | Run `npx expo install react-native-web @expo/metro-runtime`           |
| **Metro bundler cache issues** | Run `npx expo start --clear` to clear cache                           |
| **iOS/Android build fails**    | Run `npx expo prebuild` to generate native projects                   |

---

## Data Sources Integrated

### 1. Convex (Backend Database)

**Location**: [`/convex`](./convex)

Convex serves as the real-time backend for storing and retrieving emotion sessions.

#### Schema (`convex/schema.ts`)

```typescript
emotionSessions: defineTable({
	userId: v.optional(v.string()), // Clerk user ID
	emotionPath: v.array(v.string()), // Hierarchy path (e.g., ["Happy", "Playful", "Aroused"])
	leafEmotion: v.string(), // Final selected emotion
	intensity: v.number(), // 1-10 scale
	trigger: v.string(), // Optional: what triggered the emotion
	timestamp: v.string(), // ISO 8601 timestamp
});
```

#### Available Queries & Mutations (`convex/emotions.ts`)

| Function             | Type     | Description                           |
| -------------------- | -------- | ------------------------------------- |
| `logSession`         | Mutation | Creates a new emotion session         |
| `getSessions`        | Query    | Fetches last 100 sessions for a user  |
| `getSessionsByMonth` | Query    | Fetches sessions for a specific month |
| `getRecentSession`   | Query    | Gets the most recent session          |

### 2. Clerk (Authentication)

**Configuration**: Environment variables in `.env.local`

Clerk provides OAuth authentication with Google. User data accessed:

- `user.id` - Unique user identifier
- `user.firstName` - Display name
- `user.emailAddresses` - Primary email
- `user.imageUrl` - Profile picture

**Token Storage**: Auth tokens are securely stored using `expo-secure-store` (see [`tokenCache.ts`](./src/utils/tokenCache.ts))

### 3. Plutchik Emotion Data

**Location**: [`/src/constants/emotions.ts`](./src/constants/emotions.ts)

A comprehensive hierarchical tree structure based on Robert Plutchik's Wheel of Emotions:

- **7 Primary Emotions**: Happy, Sad, Disgusted, Angry, Fearful, Bad, Surprised
- **~40 Secondary Emotions**: Playful, Content, Lonely, Vulnerable, etc.
- **~80 Tertiary Emotions**: Aroused, Cheeky, Isolated, Abandoned, etc.

Each emotion includes:

```typescript
{
  id: string,        // Unique identifier
  name: string,      // Display name
  color: string,     // Hex color code
  definition: string,// Brief description
  children?: Emotion[] // Sub-emotions
}
```

### Environment Configuration

| Variable                            | Description                    | Where to Get                                              |
| ----------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `CONVEX_DEPLOYMENT`                 | Convex project deployment name | [Convex Dashboard](https://dashboard.convex.dev)          |
| `EXPO_PUBLIC_CONVEX_URL`            | Convex HTTP endpoint           | Convex Dashboard → Settings                               |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public API key           | [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |

---

## Expected Outcomes

### Primary Goals

FeelFlow is designed to:

1. **Help users identify emotions precisely** - Navigate from broad categories (e.g., "Happy") to specific feelings (e.g., "Aroused", "Cheeky")
2. **Track emotional patterns over time** - Review logged sessions in a calendar view
3. **Capture context** - Record intensity levels and triggers for self-reflection
4. **Provide a delightful UX** - Swipe-based interaction with smooth animations

### User Flow

1. **Login** → Sign in with Google via Clerk OAuth
2. **Explore Emotions** → Swipe through emotion cards:
   - **Swipe Right** → Dive deeper into sub-emotions or select a leaf emotion
   - **Swipe Left** → Skip to the next emotion in the current level
3. **Log Session** → When a leaf emotion is selected:
   - Set intensity (1-10 scale)
   - Optionally describe the trigger
   - Submit to save the session
4. **View History** → Navigate to the calendar view to review past sessions

### Expected Output

When running successfully, users will experience:

| Action                 | Result                                                                   |
| ---------------------- | ------------------------------------------------------------------------ |
| Open app (signed out)  | Login screen with "Continue with Google" button                          |
| Sign in                | Redirected to main emotion swipe screen                                  |
| Swipe right on emotion | Navigate to child emotions OR open context modal (if leaf)               |
| Submit in modal        | Toast confirmation, session saved to Convex                              |
| Open history           | Calendar with dots indicating days with logged sessions                  |
| Tap a day              | List of sessions for that day with emotion, intensity, path, and trigger |

### Success Indicators

- ✅ User can authenticate via Google
- ✅ Emotion cards display with correct colors and icons
- ✅ Swipe gestures work smoothly
- ✅ Sessions are persisted to Convex
- ✅ History calendar loads and displays sessions correctly
- ✅ Dark/light theme toggle works

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

**Built with ❤️ using React Native, Expo, Convex, and Clerk**
