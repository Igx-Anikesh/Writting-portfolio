"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LayoutWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function LayoutWrapper({ children, className }: LayoutWrapperProps) {
    return (
        <div className={cn("mx-auto w-[77.5%]", className)}>
            {children}
        </div>
    );
}
