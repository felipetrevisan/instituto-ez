"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { mathematizerQuery } from "@/sanity/lib/queries";
import { Mathematizer } from "@/types/mathematizer";

export async function getMathematizers() {
  return sanityFetch<Mathematizer[]>({ query: mathematizerQuery });
}
