"use client";

import React from "react";
import { books } from "@/lib/books-data";
import { useParams } from "next/navigation";
import ReaderInterface from "@/components/reader/reader-interface";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReaderPage() {
    const params = useParams();
    const id = Number(params?.id);
    const book = books.find((b) => b.id === id);

    if (!book || !book.sampleText) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-2xl font-serif mb-4">Content requires purchase or is unavailable.</h1>
                <Link href="/books" className="flex items-center gap-2 text-sm underline opacity-60 hover:opacity-100">
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </Link>
            </div>
        );
    }

    return (
        <ReaderInterface
            text={book.sampleText}
            bookId={book.id}
            bookTitle={book.title}
        />
    );
}
