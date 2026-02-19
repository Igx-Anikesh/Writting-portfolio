"use client";

import React, { useState, useEffect } from "react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const bioText = [
        "I write stories that examine how memory, time, and emotion reshape ordinary lives.",
        "My narratives often begin in familiar places — classrooms, homes, rainy streets — and gradually uncover the psychological weight carried beneath routine moments.",
        "I am interested less in events and more in perception: how people misunderstand each other, how silence changes relationships, and how decisions echo long after they are made.",
        "Many of my stories move between past and present, where reflection becomes as important as action.",
        "For me, writing is both architecture and inquiry — a way to construct lives on the page while questioning what it truly means to remember, to love, and to endure."
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-background text-foreground relative selection:bg-primary/20">
            {/* Background: Digital Noise / Abstract Data */}
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"
                />
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <LayoutWrapper className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start h-full">

                {/* Left: Narrative Bio */}
                <div className="space-y-12 max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold tracking-tighter"
                    >
                        The <span className="text-muted-foreground italic">Architect</span> <br />
                        of Memory.
                    </motion.h1>

                    <div className="space-y-8 font-serif text-lg md:text-xl leading-relaxed text-foreground/90">
                        {bioText.map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                                className="relative hover:text-foreground transition-colors group"
                            >
                                {/* Glitch/Highlight Effect on Hover */}
                                <span className="absolute -left-6 top-1 w-1 h-full bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 w-0.5" />
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Signature / Code Block */}
                    <div className="pt-12 border-t border-border/20">
                        <code className="text-xs font-mono text-muted-foreground opacity-60">
                            &gt; SYSTEM_STATUS: NARRATIVE_CONSTRUCTED <br />
                            &gt; MEMORY_ALLOCATION: 94% <br />
                            &gt; EMOTION_CORE: STABLE
                        </code>
                    </div>
                </div>

                {/* Right: AI "Sense" / Analysis Column */}
                <div className="hidden lg:block sticky top-[95px] space-y-8 self-start">
                    {/* Portrait Placeholder - Generative/Abstract */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="aspect-[3/4] bg-muted relative rounded-sm overflow-hidden border border-border/50"
                    >
                        {/* Author Image - Moody/Cinematic */}
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                            alt="The Architect"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Interactive Gradient Overlay (Subtler now) */}
                        <div
                            className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-black/60 mix-blend-overlay pointer-events-none"
                        />
                        <div
                            className="absolute w-32 h-32 bg-primary/30 rounded-full blur-3xl mix-blend-soft-light transition-transform duration-100 ease-out"
                            style={{
                                transform: `translate(${cursorPos.x / 10}px, ${cursorPos.y / 10}px)`
                            }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Neural Pattern</h3>
                            <p className="text-xs font-mono text-foreground mt-1">Simulating Human Resonance...</p>
                        </div>
                    </motion.div>

                </div>
            </LayoutWrapper>
        </main>
    );
}
