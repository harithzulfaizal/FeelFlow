import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeMode, ThemeColors, getColors } from "../styles/theme";

interface ThemeContextType {
	mode: ThemeMode;
	colors: ThemeColors;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<ThemeMode>("dark");

	const toggleTheme = () => {
		setMode((prev) => (prev === "dark" ? "light" : "dark"));
	};

	const value: ThemeContextType = {
		mode,
		colors: getColors(mode),
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
