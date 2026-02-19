"use client";

import React from "react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShoppingBag, MoreHorizontal } from "lucide-react";
import { books } from "@/lib/books-data";
import { useParams, notFound } from "next/navigation";

export default function BookDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const book = books.find((b) => b.id === id);

    if (!book) {
        return (
            <main className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif">404</h1>
                    <p className="text-muted-foreground mt-2">Book not found.</p>
                    <Link href="/books" className="mt-8 text-sm underline">Return to Library</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full relative overflow-hidden bg-background text-foreground transition-colors duration-500">
            {/* Ambient Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Dynamic Gradient based on Book ID */}
                <div
                    className="absolute inset-0 opacity-20 dark:opacity-10 blur-3xl scale-150"
                    style={{ background: `radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 70%)` }}
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
            </div>

            <div className="absolute top-32 left-4 md:left-6 lg:left-8 z-50 max-w-[10%]">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/books" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground transition-colors px-0 group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Library
                    </Link>
                </motion.div>
            </div>

            <LayoutWrapper className="relative z-10 h-full min-h-screen flex flex-col pt-32 pb-20 justify-start lg:pl-12">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 xl:gap-20 items-start">
                    {/* Left: The Poster (Book Cover) - Reduced Height */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative mx-auto lg:mx-0"
                    >
                        <div className="h-[50vh] md:h-[60vh] lg:h-[65vh] w-auto aspect-[2/3] rounded-lg shadow-2xl overflow-hidden relative group border border-white/10">
                            {/* Placeholder Cover Art */}
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    background: `linear-gradient(${book.id * 45}deg, var(--muted) 0%, var(--card) 100%)`
                                }}
                            >
                                {book.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover shadow-inner"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                                        {/* Title on Cover (Subtle) for placeholder */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h1 className="text-2xl font-serif font-bold text-foreground/20 leading-none tracking-tighter mix-blend-overlay">{book.title}</h1>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Metadata & Information */}
                    <div className="space-y-6 max-w-2xl px-4 lg:px-0 pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                                <span className="px-2 py-1 border border-border rounded">{book.year}</span>
                                <span className="bg-primary/10 text-primary px-2 py-1 rounded">{book.genre}</span>
                                <span>3h 1m Read Time</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight mb-4 leading-tight">
                                {book.title}
                            </h1>

                            <h2 className="text-sm md:text-base font-light text-muted-foreground italic mb-3 max-w-lg">
                                {book.desc}
                            </h2>
                        </motion.div>

                        {/* Synopsis / Detail Block */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="prose prose-sm dark:prose-invert text-foreground/80 font-serif leading-loose border-t border-border/10 pt-3"
                        >
                            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-4">Synopsis</h3>
                            <p>{book.synopsis}</p>
                        </motion.div>

                        {/* Text Actions (Moved Below Synopsis) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-8 pt-4"
                        >
                            <Link
                                href={book.readLink}
                                target="_blank"
                                className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="underline underline-offset-4 decoration-border group-hover:decoration-primary transition-all">Start Reading</span>
                            </Link>
                            <Link
                                href={book.buyLink}
                                target="_blank"
                                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-foreground transition-all">Buy Now</span>
                            </Link>
                            <button className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                <MoreHorizontal className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="underline underline-offset-4 decoration-transparent group-hover:decoration-foreground transition-all">More Details</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </LayoutWrapper>
        </main>
    );
}
