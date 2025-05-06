"use server";

import { sanityFetch } from "@/sanity/lib/fetch";
import { testimonialsQuery } from "@/sanity/lib/queries";
import { Testimonial } from "@/types/testimonial";

export async function getTestimonials() {
	return sanityFetch<Testimonial[]>({ query: testimonialsQuery });
}
