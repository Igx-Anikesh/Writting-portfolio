"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { BookOpen, PenTool } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const showClock = pathname?.includes('/read');

    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        if (showClock) {
            setTime(new Date());
            const timer = setInterval(() => {
                setTime(new Date());
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setTime(null);
        }
    }, [showClock]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Formatting
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-GB', { hour12: false }); // 24h format HH:MM:SS
    };
    const formatDate = (date: Date) => {
        // e.g., "Mon 06 Feb"
        return date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
    };

    // If on reading page, don't render this navbar at all (ReaderInterface handles it)
    if (showClock) return null;

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={false}
                animate={{
                    width: isScrolled ? "92.5%" : "85%", // Match LayoutWrapper
                    y: isScrolled ? 0 : 20,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className={cn(
                    "pointer-events-auto flex items-center justify-between px-4 py-2 md:px-6 md:py-3 rounded-2xl transition-all duration-300",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border border-border shadow-lg"
                        : "bg-transparent border border-transparent"
                )}
            >
                {/* Left: Logo */}
                {!showClock && (
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <BookOpen className="w-6 h-6 text-foreground" />
                        <span className="text-lg font-bold font-serif tracking-tight ml-2 hidden sm:block">@Anikeshュ</span>
                    </Link>
                )}

                {/* Center: Navigation Links */}
                {!showClock && (
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                        <Link href="/#writings" className="hover:text-foreground/70 transition-colors">Writings</Link>
                        <Link href="/books" className="hover:text-foreground/70 transition-colors">Books</Link>
                        <Link href="/about" className="hover:text-foreground/70 transition-colors">About</Link>
                    </div>
                )}

                {/* Right: Status Bar (Theme + Clock) */}
                <div className="flex items-center gap-3">
                    {/* Buy Link - Optional (Kept distinct) */}
                    {!showClock && (
                        <Link
                            href="https://example.com/buy-books"
                            target="_blank"
                            className="hidden lg:flex items-center gap-2 text-xs font-bold hover:opacity-70 transition-opacity mr-2"
                        >
                            <span>Store</span>
                            <PenTool className="w-3 h-3" />
                        </Link>
                    )}

                    {/* Status Capsule */}
                    <div className={cn(
                        "flex items-center bg-muted/20 backdrop-blur-sm rounded-full border border-border/50 p-1 gap-3 h-11 transition-all duration-300",
                        showClock ? "pl-1 pr-4" : "px-1" // Adjust padding based on content
                    )}>
                        <ThemeToggle />

                        {showClock && (
                            <>
                                <div className="w-px h-4 bg-border/50" />

                                <div className="flex flex-col items-end justify-center h-full leading-none animate-in fade-in duration-300">
                                    {time && (
                                        <>
                                            <span className="text-xs font-mono font-medium tabular-nums tracking-widest">
                                                {formatTime(time)}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                                {formatDate(time)}
                                            </span>
                                        </>
                                    )}
                                    {!time && (
                                        // Skeleton / Loading State
                                        <div className="space-y-1 opacity-50">
                                            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                                            <div className="h-2 w-12 bg-muted rounded animate-pulse" />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.nav>
        </div>
    );
}
