"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types/service";

export async function getServices() {
  return sanityFetch<Service[]>({ query: servicesQuery });
}
