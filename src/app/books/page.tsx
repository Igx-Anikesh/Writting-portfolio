"use client";

import React from "react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import { books } from "@/lib/books-data";

export default function BooksPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background text-foreground transition-colors duration-500">
            <LayoutWrapper>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                        Published Works
                    </h1>
                    <p className="text-muted-foreground text-lg font-light max-w-2xl">
                        A collection of stories, fragments, and published novels spanning different genres and timelines.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book, i) => (
                        <Link key={book.id} href={`/books/${book.id}`} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col gap-4 group"
                            >
                                {/* Cover Image Container */}
                                <div className="aspect-[2/3] w-full overflow-hidden rounded-md border border-border/20 relative shadow-sm group-hover:shadow-md transition-all duration-500">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />

                                    {/* Overlay removed as per user request */}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <h2 className="text-xl font-serif font-medium group-hover:text-primary transition-colors">
                                            {book.title}
                                        </h2>
                                        <span className="text-xs font-mono text-muted-foreground">
                                            {book.year}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground/80 line-clamp-2">
                                        {book.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </LayoutWrapper>
        </main>
    );
}
