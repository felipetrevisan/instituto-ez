"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardProps } from "@/components/ui/card";
import { cn, getLink } from "@/lib/utils";
import { Service } from "@/types/service";
import { urlForImage } from "@/sanity/lib/utils";

import "./style.scss";

type Props = {
  index: number;
  item: Service;
} & CardProps;

const MotionCard = motion(Card);

export function ServiceCard({
  item: { button, image, title },
  index,
  className,
}: Props) {
  return (
    <MotionCard
      variant="ghost"
      initial="normal"
      className="flex items-center justify-center rounded-xl bg-card bg-center w-full h-64 lg:h-80 relative bg-cover shadow-2xl"
      style={{
        backgroundImage: `url("${urlForImage(image.asset)}")`,
      }}
    >
      <CardContent className="p-20 md:p-0 lg:p-0 w-full h-full">
        <div
          className={cn("flex flex-col gap-4 absolute -top-14", className, {
            "left-10": index % 2 == 0,
            "right-10": index % 2 != 0,
          })}
        >
          <h2 className="mix-blend-multiply font-semibold clamp-[xl-6cqw-6xl] text-center text-primary-foreground">
            {title}
          </h2>
          {button.visible && (
            <Link href={getLink(button)} passHref>
              <Button
                variant="outline"
                theme="default"
                rounded="2xl"
                hover="effect"
                className="w-full"
                disabled={button.disabled}
              >
                {button.label}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </MotionCard>
  );
}
