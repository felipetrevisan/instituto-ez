"use client";

import { useLecture } from "@/hooks/use-lecture";
import { LectureCard as Card } from "./card";
import { Skeleton } from "./skeleton";

export function Lectures() {
  const { data, isLoading } = useLecture();

  return (
    <div className="flex flex-col gap-12 lg:gap-28">
      {isLoading && (
        <>
          <Skeleton className="lg:absolute lg:left-0" />
          <Skeleton className="lg:absolute lg:right-0" />
        </>
      )}
      {data?.map((item, index) => <Card key={item.id} item={item} index={index} />)}
    </div>
  );
}
