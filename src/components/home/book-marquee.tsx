"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "framer-motion";
import { books } from "@/lib/books-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BookMarquee() {
    const [shuffledBooks, setShuffledBooks] = useState(books);
    const [isHovered, setIsHovered] = useState(false);

    // Shuffle on mount
    useEffect(() => {
        setShuffledBooks([...books].sort(() => Math.random() - 0.5));
    }, []);

    const baseX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Speed configuration
    const baseVelocity = -0.5; // Negative for left scroll
    const hoverVelocity = baseVelocity * 0.01; // 1% speed (99% reduction)

    useAnimationFrame((t, delta) => {
        const velocity = isHovered ? hoverVelocity : baseVelocity;
        let moveBy = velocity * (delta / 1000) * 60; // Normalize delta

        // Apply movement
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section className="py-20 border-t border-border/40 overflow-hidden bg-muted/5">
            <div
                className="relative w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex whitespace-nowrap" ref={containerRef}>
                    <ParallaxText baseVelocity={baseVelocity} isHovered={isHovered}>
                        {shuffledBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </ParallaxText>
                </div>

                {/* Gradient Masks for seamless fade */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
}

function ParallaxText({ children, baseVelocity = 100, isHovered }: { children: React.ReactNode, baseVelocity: number, isHovered: boolean }) {
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`); // Wrap logic needs tuning based on width ratio

    // We need a manual wrapping logic because 'wrap' usually works on 0-100% or pixels. 
    // Custom infinite loop logic:

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        // 99% speed reduction on hover
        const currentVelocity = isHovered ? baseVelocity * 0.01 : baseVelocity;

        let moveBy = directionFactor.current * currentVelocity * (delta / 1000);

        // For smoother motion on high refresh rate
        // Note: The logic here is tricky with wrapping. 
        // Let's use a simpler "render 4 copies and translate" approach for robustness.

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="flex overflow-hidden m-0 whitespace-nowrap flex-nowrap">
            <motion.div className="flex flex-nowrap gap-4 md:gap-8 items-center" style={{ x: baseX }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

// Improved Infinite Loop Logic Component
function InfiniteLoopSlider({ children, isHovered }: { children: React.ReactNode, isHovered: boolean }) {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth / 2); // Divide by 2 because we double render
        }
    }, [children]);

    const speed = 0.5; // Pixels per frame approx
    const reducedSpeed = speed * 0.01;

    useAnimationFrame((time, delta) => {
        const currentSpeed = isHovered ? reducedSpeed : speed;
        // Move left
        const newX = x.get() - (currentSpeed * (delta / 16));

        // Reset when dragged past half width (seamless loop)
        if (contentWidth > 0 && newX <= -contentWidth) {
            x.set(0);
        } else {
            x.set(newX);
        }
    });

    return (
        <div className="overflow-hidden w-full">
            <motion.div
                ref={containerRef}
                className="flex gap-4 md:gap-8 w-max px-4"
                style={{ x }}
            >
                {/* Render Double for Seamless Loop */}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

function BookCard({ book }: { book: any }) {
    return (
        <Link href={`/books/${book.id}`} className="group/card block relative w-[180px] md:w-[280px] flex-shrink-0 transition-transform hover:scale-[1.02] duration-500">
            <div className="aspect-[2/3] bg-muted w-full rounded-md overflow-hidden relative border border-border/50 group-hover/card:border-foreground/50 transition-colors">
                {/* Cover Image */}
                <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full">{book.year}</span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity -translate-y-2 group-hover/card:translate-y-0 duration-300" />
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs font-bold text-primary/80 uppercase tracking-wider">{book.genre}</span>
                        <h3 className="text-xl font-serif font-medium leading-tight text-foreground line-clamp-2 group-hover/card:text-primary transition-colors">
                            {book.title}
                        </h3>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Main Export
export function IntegratedBookMarquee() {
    const [shuffled, setShuffled] = useState(books);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Randomize 11 books, ensuring no duplicates visually adjacent (unique shuffle)
        // Since input is unique, simple shuffle is fine.
        setShuffled([...books].sort(() => Math.random() - 0.5));
    }, []);

    return (
        <section className="py-24 border-t border-border/40 overflow-hidden">
            <div className="mb-12 px-6 md:px-12 flex justify-between items-end">
                <h2 className="text-3xl font-serif font-bold">The Archive</h2>
                <span className="text-xs font-mono text-muted-foreground">SCROLL TO EXPLORE</span>
            </div>

            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full relative"
            >
                <InfiniteLoopSlider isHovered={isHovered}>
                    {shuffled.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </InfiniteLoopSlider>

                {/* Vignette */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>

            {/* Enter Library CTA Section */}
            <div className="mt-24 mb-12 flex flex-col items-center justify-center text-center space-y-8">
                <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">
                    "Read with me, not just about me."
                </p>

                <Link
                    href="/books"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full bg-foreground text-background font-medium transition-all hover:scale-105"
                >
                    <span className="relative z-10 text-lg tracking-wide">Enter the Library</span>
                    <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
            </div>
        </section>
    );
}
