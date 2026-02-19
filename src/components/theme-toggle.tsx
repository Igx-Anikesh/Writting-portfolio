"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Ghost, Circle } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

type Theme = "default" | "slice-of-life" | "thriller";

const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: "default", label: "General", icon: <Circle className="w-4 h-4" /> },
    { id: "slice-of-life", label: "Slice of Life", icon: <Sun className="w-4 h-4" /> },
    { id: "thriller", label: "Thriller", icon: <Ghost className="w-4 h-4" /> },
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // Find current index to cycle to next
    const currentIndex = themes.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const activeTheme = themes[currentIndex] !== undefined ? themes[currentIndex] : themes[0];

    const cycleTheme = () => {
        setTheme(themes[nextIndex].id);
    };

    return (
        <button
            onClick={cycleTheme}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-muted/20 hover:bg-muted/40 backdrop-blur-sm border border-border/50 transition-colors group overflow-hidden"
            title={`Switch to ${themes[nextIndex].label}`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={activeTheme.id}
                    initial={{ y: 20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="text-foreground"
                >
                    {activeTheme.icon}
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
