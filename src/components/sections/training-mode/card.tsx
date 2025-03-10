"use client";

import { ImageProps } from "next/image";
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

export function TrainingModeCard({ image: { src }, title, className }: Props) {
  return (
    <MotionCard
      variant="ghost"
      initial="normal"
      className="flex items-center justify-center rounded-xl bg-card w-full h-80 relative bg-cover shadow-2xl"
      style={{
        backgroundImage: `url("${src}")`,
      }}
    >
      <CardContent className="p-0 w-full h-full">
        <div className={cn("flex flex-col gap-4 absolute -top-8", className)}>
          <h2
            className={cn(
              `mix-blend-multiply font-semibold text-base md:text-3xl lg:text-6xl text-center text-primary-foreground`
            )}
          >
            {title}
          </h2>
          <Button variant="outline" theme="default" rounded="2xl" hover="effect">
            Saiba mais
          </Button>
        </div>
      </CardContent>
    </MotionCard>
  );
}
