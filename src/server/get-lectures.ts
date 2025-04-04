"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { lectureQuery } from "@/sanity/lib/queries";
import { Lecture } from "@/types/lecture";

export async function getLectures() {
  return sanityFetch<Lecture[]>({ query: lectureQuery });
}
