"use client";

import React, { useState, useEffect } from "react";
import { books } from "@/lib/books-data";
import { useParams } from "next/navigation";
import ReaderInterface from "@/components/reader/reader-interface";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReaderPage() {
    const params = useParams();
    const id = Number(params?.id);
    const book = books.find((b) => b.id === id);

    const [paragraphs, setParagraphs] = useState<string[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/book-content/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => setParagraphs(data.paragraphs))
            .catch(() => setError(true));
    }, [id]);

    if (!book || error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-2xl font-serif mb-4">Content requires purchase or is unavailable.</h1>
                <Link href="/books" className="flex items-center gap-2 text-sm underline opacity-60 hover:opacity-100">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </Link>
            </div>
        );
    }

    if (!paragraphs) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <div className="space-y-4 text-center">
                    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Loading manuscript...</p>
                </div>
            </div>
        );
    }

    return (
        <ReaderInterface
            text={paragraphs}
            bookId={book.id}
            bookTitle={book.title}
        />
    );
}
