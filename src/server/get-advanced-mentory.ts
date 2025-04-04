"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { advancedMentoryQuery } from "@/sanity/lib/queries";
import { AdvancedMentory } from "@/types/advanced-mentory";

export async function getAdvancedMentory() {
  return sanityFetch<AdvancedMentory>({ query: advancedMentoryQuery });
}
