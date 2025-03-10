"use client";

import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import "./style.scss";

type Props = {
  image: Pick<ImageProps, "src">;
  title: string;
} & CardProps;

const MotionCard = motion(Card);

export function WorkshopCard({ image: { src }, title, className }: Props) {
  return (
    <MotionCard
      variant="ghost"
      initial="normal"
      className="flex items-center justify-center rounded-xl bg-card w-80 h-full relative bg-cover"
      style={{
        backgroundImage: `url("${src}")`,
      }}
    >
      <CardContent className="p-0 w-full h-full">
        {/* <div className={cn("flex flex-col gap-4 absolute -top-8", className)}>
          <h2
            className={cn(
              `mix-blend-multiply font-semibold text-base md:text-3xl lg:text-6xl text-center text-primary-foreground`
            )}
          >
            {title}
          </h2>
          <Button variant="outline" rounded="2xl" hover="effect">
            Saiba mais
          </Button>
        </div> */}
        {/* <div className="flex flex-col items-center justify-start gap-5">
          <div className="flex flex-col items-center justify-start gap-4 text-sm">
            <div className="hidden justify-end w-full group-hover:flex absolute bottom-0 opacity-0 group-hover:opacity-100 group-hover:transition-all">
              <Button variant="default" className="rounded-tl-3xl border-r-0 border-b-0">
                Ver mais
              </Button>
            </div>
          </div>
        </div> */}
      </CardContent>
    </MotionCard>
  );
}
