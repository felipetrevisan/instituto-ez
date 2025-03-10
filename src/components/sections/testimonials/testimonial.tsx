"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/types/testimonial";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const MotionCard = motion(Card);

interface TestimonialProps extends Partial<Testimonial> {
  hoveredIndex: string | null;
  setHoveredIndex: (id: string | null) => void;
}

export function Testimonial({
  author,
  testimonial,
  id,
  hoveredIndex,
  setHoveredIndex,
}: TestimonialProps) {
  const isBlurred = hoveredIndex !== null && hoveredIndex !== id;

  return (
    <MotionCard
      className={cn(
        "overflow-visible h-[300px] max-h-[300px] group relative select-none cursor-pointer p-1 transition-all"
      )}
      variant="tertiary"
      rounded="2xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onHoverStart={() => setHoveredIndex(id!)}
      onHoverEnd={() => setHoveredIndex(null)}
      animate={{
        filter: isBlurred ? "blur(10px)" : "blur(0px)",
        opacity: isBlurred ? 0.5 : 1,
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
    >
      <CardContent className="flex items-center justify-center w-ful p-0 h-full">
        <figure className="relative flex flex-col items-center justify-evenly w-full h-full border-0 py-0 px-8">
          <ScrollArea className="h-3/4 max-w-2xl mx-auto mb-4 lg:mb-8 text-base relative w-full">
            <p className="my-4 font-bold">{testimonial}</p>
          </ScrollArea>
          <figcaption className="absolute flex items-center justify-center -bottom-4 bg-background p-3 rounded-2xl -right-1">
            <div className="space-y-0.5 font-bold text-slate-700 text-left rtl:text-right ms-3">
              <div>{author?.name}</div>
            </div>
          </figcaption>
        </figure>
      </CardContent>
    </MotionCard>
  );
}
