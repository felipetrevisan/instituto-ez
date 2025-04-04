"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutQuery } from "@/sanity/lib/queries";
import { About } from "@/types/about";

export async function getAboutContent() {
  return sanityFetch<About[]>({ query: aboutQuery });
}
