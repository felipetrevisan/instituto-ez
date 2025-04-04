"use client";

import { useSite } from "@/hooks/use-site";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import { Skeleton } from "./skeleton";

export function About() {
  const { data, isLoading } = useSite();

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-none lg:grid-areas-[left_right_right] gap-4 w-full h-[400px] lg:h-[600px]">
        <div className="relative lg:grid-in-[left] w-full rounded-2xl overflow-hidden">
          <Image
            src="/assets/images/slogan.png"
            fill
            alt=""
            priority
            className="w-full h-full object-fill lg:object-cover"
          />
        </div>
        {isLoading && <Skeleton className="grid-in-[right]" />}
        {!isLoading && (
          <div className="relative lg:grid-in-[right] w-full rounded-2xl">
            <Image
              src={urlForImage(data?.hero?.[0].background.asset!).url()}
              fill
              alt=""
              priority
              className="w-full h-full object-cover rounded-2xl overflow-hidden"
              placeholder="blur"
              blurDataURL={data?.hero?.[0].background.metadata.lqip}
            />
            <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -top-8 left-20 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
              <h2 className="lg:text-3xl font-bold">{data?.hero?.[0].title}</h2>
              <p className="font-light">{data?.hero?.[0].description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-none lg:grid-areas-[left_left_left_right_right_right] gap-4 w-full h-[400px] lg:h-[600px] mb-14">
        {isLoading && <Skeleton className="grid-in-[left]" />}
        {!isLoading && (
          <div className="relative lg:grid-in-[left] w-full rounded-2xl">
            <Image
              src={urlForImage(data?.hero?.[2].background.asset!).url()}
              fill
              alt=""
              priority
              className="w-full h-full object-cover rounded-2xl overflow-hidden"
              placeholder="blur"
              blurDataURL={data?.hero?.[2].background.metadata.lqip}
            />
            <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -bottom-16 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-4 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
              <h2 className="lg:text-3xl font-bold">{data?.hero?.[2].title}</h2>
              <p className="font-light">{data?.hero?.[2].description}</p>
            </div>
          </div>
        )}
        {isLoading && <Skeleton className="grid-in-[right]" />}

        {!isLoading && (
          <div className="relative lg:grid-in-[right] w-full rounded-2xl">
            <Image
              src={urlForImage(data?.hero?.[1].background.asset!).url()}
              fill
              alt=""
              priority
              className="w-full h-full object-cover rounded-2xl overflow-hidden"
              placeholder="blur"
              blurDataURL={data?.hero?.[1].background.metadata.lqip}
            />
            <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -bottom-16 lg:-top-28 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-40 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
              <h2 className="lg:text-3xl font-bold">{data?.hero?.[1].title}</h2>
              <p className="font-light">{data?.hero?.[1].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
