"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Settings, ChevronLeft, PenLine, Pencil, Eraser, Check, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle"; // Fix: Default import
import { useTheme } from "@/context/theme-provider"; // Import useTheme
import Lenis from "lenis"; // Import Lenis for smooth scroll

interface ReaderInterfaceProps {
    text: string[];
    bookId: number;
    bookTitle: string;
}

// ... interfaces ...
interface Highlight {
    text: string;
    type: 'highlighter' | 'pen';
    color: string;
    penSize?: '2px' | '4px';
    paragraphIndex: number;
    id: string;
}

interface Note {
    id: string;
    paragraphIndex: number;
    content: string;
    createdAt: Date;
}

// Configuration for Highlighter Colors (Pastels)
const HIGHLIGHTER_COLORS = {
    yellow: { ui: '#FDE68A', value: 'rgba(253, 230, 138, 0.5)' },
    blue: { ui: '#93C5FD', value: 'rgba(147, 197, 253, 0.4)' },
    green: { ui: '#86EFAC', value: 'rgba(134, 239, 172, 0.4)' },
    pink: { ui: '#F9A8D4', value: 'rgba(249, 168, 212, 0.4)' },
};

// Configuration for Pen Colors (Ink)
const PEN_COLORS = {
    black: { ui: '#1F2937', value: '#000000' },
    red: { ui: '#EF4444', value: '#EF4444' },
    blue: { ui: '#3B82F6', value: '#3B82F6' },
    green: { ui: '#22C55E', value: '#22C55E' },
    yellow: { ui: '#F59E0B', value: '#F59E0B' }, // Amber for visibility
    pink: { ui: '#EC4899', value: '#EC4899' },
};

export default function ReaderInterface({ text, bookId, bookTitle }: ReaderInterfaceProps) {
    // Config
    const [fontSize, setFontSize] = useState(18);
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Added for Lenis content target
    const [immersive, setImmersive] = useState(false);
    const { setTheme } = useTheme();

    // Lenis Scroll Integration for Reader
    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: containerRef.current,
            content: contentRef.current,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        // Start loop
        const rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Notes State
    const [notes, setNotes] = useState<Note[]>([]);

    const handleSaveNote = (paragraphIndex: number, content: string) => {
        const newNote: Note = {
            id: Math.random().toString(36).substr(2, 9),
            paragraphIndex,
            content,
            createdAt: new Date()
        };
        setNotes([...notes, newNote]);
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    // Toggle Fullscreen and handle Immersive
    const toggleImmersive = () => {
        if (!immersive) {
            setImmersive(true);
            setTheme('slice-of-life'); // Auto-switch to Slice of Life
            document.documentElement.requestFullscreen().catch((e) => {
                console.error("Fullscreen failed:", e);
            });
        } else {
            setImmersive(false);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((e) => console.error("Exit fullscreen failed", e));
            }
        }
    };

    // Listen for Escape key or browser exit
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setImmersive(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Tool State
    const [activeTool, setActiveTool] = useState<'highlighter' | 'pen' | 'eraser' | null>(null);
    const [penSize, setPenSize] = useState<'2px' | '4px'>('2px');

    // Floating Menu State
    const [menuState, setMenuState] = useState<{
        visible: boolean;
        type: 'color' | 'eraser';
        x: number;
        y: number;
        text: string;
        paragraphIndex: number | null;
        overlapTypes: { hasPen: boolean, hasHighlight: boolean };
    }>({ visible: false, type: 'color', x: 0, y: 0, text: '', paragraphIndex: null, overlapTypes: { hasPen: false, hasHighlight: false } });

    // Handle Text Selection
    const handleMouseUp = (paragraphIndex: number) => {
        if (!activeTool) return;

        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText && selectedText.length > 0 && selection?.rangeCount) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            let overlapTypes = { hasPen: false, hasHighlight: false };
            if (activeTool === 'eraser') {
                const relevantHighlights = highlights.filter(h => h.paragraphIndex === paragraphIndex);
                overlapTypes.hasPen = relevantHighlights.some(h => h.type === 'pen' && (h.text.includes(selectedText) || selectedText.includes(h.text)));
                overlapTypes.hasHighlight = relevantHighlights.some(h => h.type === 'highlighter' && (h.text.includes(selectedText) || selectedText.includes(h.text)));
            }

            setMenuState({
                visible: true,
                type: activeTool === 'eraser' ? 'eraser' : 'color',
                x: rect.left + rect.width / 2,
                y: rect.top - 45,
                text: selectedText,
                paragraphIndex,
                overlapTypes
            });
        } else {
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection || selection.isCollapsed) {
                    setMenuState(prev => ({ ...prev, visible: false }));
                }
            }, 100);
        }
    };

    const applyAnnotation = (colorKey: string) => {
        if (menuState.paragraphIndex !== null && menuState.text && activeTool && activeTool !== 'eraser') {
            const newHighlight: Highlight = {
                text: menuState.text,
                type: activeTool,
                color: colorKey,
                penSize: activeTool === 'pen' ? penSize : undefined,
                paragraphIndex: menuState.paragraphIndex,
                id: Math.random().toString(36).substr(2, 9)
            };
            setHighlights([...highlights, newHighlight]);
            setMenuState(prev => ({ ...prev, visible: false }));
            window.getSelection()?.removeAllRanges();
        }
    };

    const performErase = (target: 'pen' | 'highlighter' | 'both') => {
        if (menuState.paragraphIndex === null) return;

        const selection = menuState.text;

        setHighlights(prev => prev.filter(h => {
            if (h.paragraphIndex !== menuState.paragraphIndex) return true;
            const intersect = (h.text.includes(selection) || selection.includes(h.text));
            if (!intersect) return true;

            if (target === 'both') return false;
            if (target === 'pen' && h.type === 'pen') return false;
            if (target === 'highlighter' && h.type === 'highlighter') return false;

            return true;
        }));

        setMenuState(prev => ({ ...prev, visible: false }));
        window.getSelection()?.removeAllRanges();
    };

    // Immersive Mode: If active, we use z-[100] and fixed positioning to cover everything (including Navbar)
    const containerClasses = cn(
        "min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300",
        immersive ? "fixed inset-0 z-[100] bg-background" : "relative z-10 bg-background"
    );

    return (
        <div className={containerClasses}>
            {/* Immersive/Reader Header (Top Bar) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[120] h-24 flex items-center justify-between px-6 md:px-12 group/header transition-all duration-500",
                    immersive ? "" : "bg-background/80 backdrop-blur-sm"
                )}
            >
                {/* Left: Back / Exit Focus */}
                {immersive ? (
                    <button
                        onClick={toggleImmersive}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Exit Focus</span>
                    </button>
                ) : (
                    <Link
                        href={`/books/${bookId}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">Back</span>
                    </Link>
                )}

                {/* Right: Store + Status Capsule */}
                <div className="flex items-center gap-8">
                    {/* Store Button - Hidden unless Header is hovered */}
                    <Link
                        href="https://example.com/buy-books"
                        target="_blank"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover/header:opacity-100 group-hover/header:translate-x-0 translate-x-4 transition-all duration-500 ease-out text-muted-foreground hover:text-foreground"
                    >
                        <span>Store</span>
                        <PenLine className="w-3 h-3" />
                    </Link>

                    {/* Status Capsule */}
                    <div className={cn(
                        "flex items-center backdrop-blur-md rounded-full border p-1 pl-1 pr-4 gap-3 h-11 shadow-2xl transition-colors duration-500",
                        immersive
                            ? "bg-black/20 border-white/10"
                            : "bg-muted/20 border-border/10"
                    )}>
                        <ThemeToggle />
                        <div className={cn("w-px h-4 transition-colors duration-500", immersive ? "bg-white/20" : "bg-border/20")} />
                        <ClockDisplay />
                    </div>
                </div>
            </motion.div>

            {/* Floating Menu (Color OR Eraser) */}
            <AnimatePresence>
                {menuState.visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="fixed z-50 bg-background/90 backdrop-blur-md border border-border/20 shadow-xl rounded-full px-4 py-2 flex items-center gap-2"
                        style={{
                            left: menuState.x,
                            top: menuState.y,
                            transform: "translate(-50%, -100%)"
                        }}
                    >
                        {menuState.type === 'color' ? (
                            <>
                                <span className="text-[10px] uppercase font-bold text-muted-foreground px-1 hidden sm:block">
                                    {activeTool}
                                </span>

                                {activeTool === 'highlighter' && (
                                    <>
                                        <button onClick={() => applyAnnotation('yellow')} className="w-6 h-6 rounded-full bg-[#FDE68A] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Yellow" />
                                        <button onClick={() => applyAnnotation('blue')} className="w-6 h-6 rounded-full bg-[#93C5FD] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Blue" />
                                        <button onClick={() => applyAnnotation('green')} className="w-6 h-6 rounded-full bg-[#86EFAC] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Green" />
                                        <button onClick={() => applyAnnotation('pink')} className="w-6 h-6 rounded-full bg-[#F9A8D4] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Pink" />
                                    </>
                                )}

                                {activeTool === 'pen' && (
                                    <>
                                        <button onClick={() => applyAnnotation('black')} className="w-6 h-6 rounded-full bg-[#1F2937] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10 border border-white/10" title="Black" />
                                        <button onClick={() => applyAnnotation('red')} className="w-6 h-6 rounded-full bg-[#EF4444] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Red" />
                                        <button onClick={() => applyAnnotation('blue')} className="w-6 h-6 rounded-full bg-[#3B82F6] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Blue" />
                                        <button onClick={() => applyAnnotation('green')} className="w-6 h-6 rounded-full bg-[#22C55E] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Green" />
                                        <button onClick={() => applyAnnotation('yellow')} className="w-6 h-6 rounded-full bg-[#F59E0B] hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-foreground/10" title="Amber" />
                                    </>
                                )}

                                <div className="w-px h-4 bg-border/50 mx-1" />
                                <button className="w-6 h-6 rounded-full flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors" title="More Colors">
                                    <Plus className="w-3 h-3 text-muted-foreground" />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground px-1 border-r border-border/50 pr-2 mr-1">
                                    Erase
                                </span>

                                {(menuState.overlapTypes.hasPen || menuState.overlapTypes.hasHighlight) ? (
                                    <>
                                        {menuState.overlapTypes.hasPen && (
                                            <button
                                                onClick={() => performErase('pen')}
                                                className="text-xs font-medium px-2 py-1 hover:bg-muted/50 rounded-md transition-colors text-foreground/80 hover:text-foreground"
                                            >
                                                Ink
                                            </button>
                                        )}

                                        {menuState.overlapTypes.hasHighlight && (
                                            <button
                                                onClick={() => performErase('highlighter')}
                                                className="text-xs font-medium px-2 py-1 hover:bg-muted/50 rounded-md transition-colors text-foreground/80 hover:text-foreground"
                                            >
                                                Highlight
                                            </button>
                                        )}

                                        {(menuState.overlapTypes.hasPen && menuState.overlapTypes.hasHighlight) && (
                                            <>
                                                <div className="w-px h-3 bg-border/50" />
                                                <button
                                                    onClick={() => performErase('both')}
                                                    className="text-xs font-medium px-2 py-1 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                                                >
                                                    Both
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-xs text-muted-foreground">Nothing to erase</span>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reader Container */}
            <div
                className={cn(
                    "relative w-full h-[450px] z-10 transition-all duration-500",
                    immersive ? "max-w-5xl h-screen" : "max-w-[840px]"
                )}
                style={{
                    maskImage: immersive ? "linear-gradient(to bottom, transparent, black 37.5%, black 62.5%, transparent)" : "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
                    WebkitMaskImage: immersive ? "linear-gradient(to bottom, transparent, black 37.5%, black 62.5%, transparent)" : "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)"
                }}
                onContextMenu={(e) => {
                    if (immersive) e.preventDefault();
                }}
            >
                <div
                    ref={containerRef}
                    className={cn(
                        "h-full overflow-y-auto px-4 md:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
                        immersive ? "py-[30vh]" : "py-[225px]"
                    )}
                    data-lenis-prevent
                >
                    <div ref={contentRef} className="space-y-16">
                        {text.map((paragraph, index) => (
                            <ReaderParagraph
                                key={index}
                                text={paragraph}
                                fontSize={fontSize}
                                highlights={highlights.filter(h => h.paragraphIndex === index)}
                                notes={notes.filter(n => n.paragraphIndex === index)}
                                onSaveNote={(content) => handleSaveNote(index, content)}
                                onDeleteNote={handleDeleteNote}
                                onMouseUp={() => handleMouseUp(index)}
                                toolActive={!!activeTool}
                                containerRef={containerRef}
                            />
                        ))}
                        {/* End Marker */}
                        <div className="text-center pt-16 opacity-50">
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">End of Sample</span>
                            <div className="w-1 h-8 bg-border mx-auto mt-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Control Dock (Bottom) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] flex items-center bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-border/20 shadow-xl transition-all gap-4">

                {/* Tools Group */}
                <div className="flex items-center gap-2">

                    {/* Pen Tool */}
                    <div className="flex items-center bg-muted/20 rounded-full p-1 gap-1 relative group/pen">
                        {/* ... Tooltip ... */}
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/pen:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            <span className="flex items-center justify-center text-sm font-medium text-foreground bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-border/20">
                                <span className="underline decoration-2 decoration-red-500 underline-offset-4">Underline</span>
                            </span>
                        </div>

                        <button
                            onClick={() => setActiveTool(activeTool === 'pen' ? null : 'pen')}
                            className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                activeTool === 'pen' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        {activeTool === 'pen' && (
                            <div className="flex items-center gap-1 border-l border-border/50 pl-2 animate-in fade-in slide-in-from-left-4 duration-200">
                                <button onClick={() => setPenSize('2px')} className={cn("w-5 h-5 flex items-center justify-center rounded-sm transition-colors", penSize === '2px' ? "bg-foreground/10" : "hover:bg-foreground/5")} title="Thin Line">
                                    <div className="w-3 h-[2px] bg-foreground/70" />
                                </button>
                                <button onClick={() => setPenSize('4px')} className={cn("w-5 h-5 flex items-center justify-center rounded-sm transition-colors", penSize === '4px' ? "bg-foreground/10" : "hover:bg-foreground/5")} title="Thick Line">
                                    <div className="w-3 h-[4px] bg-foreground/70" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Highlighter Tool */}
                    <div className="relative group/highlight">
                        {/* ... Tooltip ... */}
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/highlight:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            <span className="flex items-center justify-center text-sm font-medium text-foreground bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-border/20">
                                <span className="bg-[#FDE68A]/80 dark:bg-[#FDE68A]/50 text-black/80 px-1 rounded-sm">Highlight</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setActiveTool(activeTool === 'highlighter' ? null : 'highlighter')}
                            className={cn(
                                "p-3 rounded-full transition-all duration-300",
                                activeTool === 'highlighter' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                            )}
                        >
                            <PenLine className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Eraser Tool */}
                    <div className="relative group/eraser">
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/eraser:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            <span className="flex items-center justify-center text-sm font-medium text-foreground bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-border/20">
                                Eraser
                            </span>
                        </div>
                        <button
                            onClick={() => setActiveTool(activeTool === 'eraser' ? null : 'eraser')}
                            className={cn(
                                "p-3 rounded-full transition-all duration-300 ml-1",
                                activeTool === 'eraser' ? "bg-red-500/10 text-red-500" : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                            )}
                            title="Eraser (Smart)"
                        >
                            <Eraser className="w-5 h-5" />
                        </button>
                    </div>

                </div>

                <div className="h-4 w-px bg-border/50" />

                {/* Font Settings */}
                <div className="flex items-center gap-2">
                    <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 hover:bg-muted/20 rounded-full text-muted-foreground"><Settings className="w-4 h-4" /></button>
                    <span className="text-xs font-mono w-4 text-center">{fontSize}</span>
                    <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-muted/20 rounded-full text-muted-foreground"><Type className="w-4 h-4" /></button>
                </div>

                <div className="h-4 w-px bg-border/50" />

                {/* Immersive Mode Toggle */}
                <div className="relative group/immersive">
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/immersive:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <span className="flex items-center justify-center text-sm font-medium text-foreground bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-border/20">
                            {immersive ? "Exit Focus" : "Focus Mode"}
                        </span>
                    </div>
                    <button
                        onClick={toggleImmersive}
                        className={cn(
                            "p-3 rounded-full transition-all duration-300",
                            immersive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                        )}
                    >
                        {immersive ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

            </div>

            <div className={cn("absolute bottom-4 left-8 text-xs font-mono text-muted-foreground opacity-30 hidden md:block", immersive && "hidden")}>
                Reading: {bookTitle}
            </div>
        </div>
    );
}

function ReaderParagraph({
    text, fontSize, highlights, notes, onSaveNote, onDeleteNote, onMouseUp, toolActive, containerRef
}: {
    text: string, fontSize: number,
    highlights: Highlight[], notes: Note[],
    onSaveNote: (content: string) => void, onDeleteNote: (id: string) => void,
    onMouseUp: () => void, toolActive: boolean,
    containerRef: React.RefObject<HTMLDivElement>
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [noteContent, setNoteContent] = useState("");

    const renderContent = () => {
        if (highlights.length === 0) return text;
        if (highlights.length === 0) return text;

        const charStyles: { pen?: Highlight, highlighter?: Highlight }[] = new Array(text.length).fill(null).map(() => ({}));

        highlights.forEach(h => {
            let searchCursor = 0;
            while (searchCursor < text.length) {
                const foundIdx = text.indexOf(h.text, searchCursor);
                if (foundIdx === -1) break;

                for (let i = foundIdx; i < foundIdx + h.text.length; i++) {
                    if (h.type === 'pen') charStyles[i].pen = h;
                    if (h.type === 'highlighter') charStyles[i].highlighter = h;
                }
                searchCursor = foundIdx + h.text.length;
            }
        });

        const segments = [];
        let currentSegment = "";
        const getStyleKey = (s: { pen?: Highlight, highlighter?: Highlight }) => {
            return `${s.pen?.id || 'null'}-${s.highlighter?.id || 'null'}`;
        };

        let currentStyle = charStyles[0];

        for (let i = 0; i < text.length; i++) {
            const styleA = currentStyle;
            const styleB = charStyles[i];
            const changed = getStyleKey(styleA) !== getStyleKey(styleB);

            if (!changed) {
                currentSegment += text[i];
            } else {
                if (currentSegment) {
                    segments.push({ text: currentSegment, style: currentStyle });
                }
                currentSegment = text[i];
                currentStyle = charStyles[i];
            }
        }
        if (currentSegment) {
            segments.push({ text: currentSegment, style: currentStyle });
        }

        return segments.map((seg, i) => {
            if (!seg.style.pen && !seg.style.highlighter) return <span key={i}>{seg.text}</span>;

            const styles: React.CSSProperties = {
                WebkitBoxDecorationBreak: 'clone',
                boxDecorationBreak: 'clone',
                padding: '0 2px'
            };

            const bgImages = [];
            const bgSizes = [];
            const bgPositions = [];
            const bgRepeats = [];

            // LAYER 1 (Top): Pen / Underline
            if (seg.style.pen) {
                const p = seg.style.pen;
                const colorConfig = PEN_COLORS[p.color as keyof typeof PEN_COLORS];
                if (colorConfig) {
                    // Solid color gradient used as an image
                    bgImages.push(`linear-gradient(to right, ${colorConfig.value}, ${colorConfig.value})`);
                    // Height determined by tool size
                    bgSizes.push(`100% ${p.penSize || '2px'}`);
                    // Stuck to bottom
                    bgPositions.push('0 100%');
                    bgRepeats.push('no-repeat');
                }
            }

            // LAYER 2 (Bottom): Highlighter
            if (seg.style.highlighter) {
                const h = seg.style.highlighter;
                const colorConfig = HIGHLIGHTER_COLORS[h.color as keyof typeof HIGHLIGHTER_COLORS];
                if (colorConfig) {
                    // Full height gradient for highlight
                    bgImages.push(`linear-gradient(to right, ${colorConfig.value}, ${colorConfig.value})`);
                    bgSizes.push('100% 100%');
                    bgPositions.push('0 0');
                    bgRepeats.push('no-repeat');
                }
            }

            if (bgImages.length > 0) {
                styles.backgroundImage = bgImages.join(', ');
                styles.backgroundSize = bgSizes.join(', ');
                styles.backgroundPosition = bgPositions.join(', ');
                styles.backgroundRepeat = bgRepeats.join(', ');
            }

            return (
                <mark
                    key={i}
                    className="rounded-none px-0 text-inherit bg-transparent box-decoration-clone transition-colors"
                    style={styles}
                >
                    {seg.text}
                </mark>
            );
        });
    };

    return (
        <div
            className="group/paragraph relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Left Note Indicator (Grey Line) */}
            <div
                onClick={() => notes.length > 0 && setIsNoteOpen(!isNoteOpen)}
                className={cn(
                    "absolute -left-6 top-1 bottom-1 w-1 rounded-full transition-all duration-300 cursor-pointer",
                    notes.length > 0
                        ? "bg-muted-foreground/30 hover:bg-primary/50"
                        : "bg-transparent group-hover/paragraph:bg-border/30 hover:!bg-primary/30",
                    isNoteOpen && "bg-primary"
                )}
                title={notes.length > 0 ? "View Notes" : "Add Note"}
            />

            {/* Note Sidebar Trigger (+) - Still useful for precise adding */}
            <div className={cn(
                "absolute -right-8 top-0 w-8 flex justify-center pt-2 transition-opacity duration-300",
                (isHovered && !isNoteOpen) ? "opacity-100" : "opacity-0"
            )}>
                <button
                    onClick={() => setIsNoteOpen(true)}
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-muted/20 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
                    title="Add Note"
                >
                    <Plus className="w-3 h-3" />
                </button>
            </div>

            <motion.p
                ref={ref}
                className={cn(
                    "leading-loose transition-all duration-300",
                    toolActive ? "select-text cursor-text" : "select-none cursor-default",
                    isNoteOpen && "opacity-100" // Keep text fully opaque when notes are open
                )}
                style={{
                    fontSize: `${fontSize}px`,
                }}
                onMouseUp={onMouseUp}
            >
                {renderContent()}
            </motion.p>

            {/* Note Popover (Right Margin) */}
            <AnimatePresence>
                {isNoteOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute top-0 left-[105%] w-72 z-50" // Pushed to the far right margin
                    >
                        <div className="bg-background/95 backdrop-blur-md border border-border/40 shadow-xl rounded-lg overflow-hidden p-4 space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-border/10 pb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Marginalia</span>
                                <button onClick={() => setIsNoteOpen(false)} className="text-muted-foreground hover:text-foreground">
                                    <Plus className="w-3 h-3 rotate-45" />
                                </button>
                            </div>

                            {/* List */}
                            <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                                {notes.length === 0 && (
                                    <p className="text-xs text-muted-foreground italic text-center py-4">No notes on this line.</p>
                                )}
                                {notes.map(note => (
                                    <div key={note.id} className="group/item relative bg-muted/30 p-3 rounded-md text-sm border border-transparent hover:border-border/30 transition-colors">
                                        <p className="text-foreground/90 leading-relaxed font-serif">{note.content}</p>
                                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                                            <span className="text-[9px] text-muted-foreground opacity-60 uppercase tracking-wider">{note.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <button onClick={() => onDeleteNote(note.id)} className="opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-500 transition-opacity">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Editor */}
                            <div className="relative pt-2">
                                <textarea
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                    placeholder="Write a thought..."
                                    className="w-full bg-muted/20 rounded-md p-3 text-sm min-h-[80px] resize-none outline-none focus:bg-muted/30 focus:ring-1 focus:ring-primary/20 transition-all font-serif placeholder:font-sans placeholder:text-muted-foreground/50"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (noteContent.trim()) {
                                                onSaveNote(noteContent);
                                                setNoteContent("");
                                            }
                                        }
                                    }}
                                />
                                <div className="absolute bottom-3 right-3 flex gap-1">
                                    <button
                                        onClick={() => {
                                            if (noteContent.trim()) {
                                                onSaveNote(noteContent);
                                                setNoteContent("");
                                            }
                                        }}
                                        className="bg-primary text-primary-foreground p-1.5 rounded-md hover:scale-105 active:scale-95 transition-all shadow-sm"
                                        disabled={!noteContent.trim()}
                                    >
                                        <Check className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Simple Clock Component for Immersive Mode (Duplicated to avoid complex shared deps for now)
function ClockDisplay() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => date.toLocaleTimeString('en-GB', { hour12: false });
    const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });

    if (!time) return <div className="w-20" />;

    return (
        <div className="flex flex-col items-end justify-center h-full leading-none">
            <span className="text-xs font-mono font-medium tabular-nums tracking-widest text-foreground">
                {formatTime(time)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                {formatDate(time)}
            </span>
        </div>
    );
}
