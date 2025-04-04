"use client";

import { Skeleton as BaseSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string } ) {
  return <BaseSkeleton className={cn("relative w-full rounded-2xl", className)} />;
}
