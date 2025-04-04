"use client";

import Link from "next/link";
import { Parallax } from "react-parallax";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { cn, getLink } from "@/lib/utils";
import { Mathematizer } from "@/types/mathematizer";
import { urlForImage } from "@/sanity/lib/utils";

type Props = {
  index: number;
  item: Mathematizer;
};

export function MathematizerCard({ item: { button, background, content, title }, index }: Props) {
  return (
    <div
      className={cn("relative flex justify-between w-full h-full min-h-[700px] lg:min-h-[500px]", {
        "flex-row-reverse": index % 2 != 0,
      })}
    >
      <Parallax
        bgImage={urlForImage(background.asset).url()}
        className="flex justify-center w-full lg:w-2/3 h-[362px] overflow-hidden rounded-r-lg"
      ></Parallax>
      <div
        className={cn(
          "flex justify-center w-11/12 lg:w-1/2 z-10 bg-card/90 shadow-lg rounded-lg absolute top-24",
          {
            "translate-x-1/2 right-1/2 lg:translate-x-0 lg:right-80": index % 2 == 0,
            "-translate-x-1/2 left-1/2 lg:translate-x-0 lg:left-80": index % 2 != 0,
          }
        )}
      >
        <div className="relative flex flex-col justify-start items-start w-full h-full text-primary-foreground p-10 gap-10">
          <h3 className="clamp-[xl-6cqw-4xl] text-center lg:text-left font-bold font-oswald">
            {title}
          </h3>
          <div className="flex flex-col font-light text-justify text-md font-questrial leading-7 gap-10 min-h-40">
            <PortableText value={content} />
            {button.visible && (
              <Link href={getLink(button)} passHref className="flex justify-center w-full">
                <Button
                  variant="default"
                  theme="tertiary"
                  rounded="xl"
                  size="2xl"
                  hover="effect"
                  className="uppercase font-bold w-full"
                  disabled={button.disabled}
                >
                  {button.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
