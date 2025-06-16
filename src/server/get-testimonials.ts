'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { testimonialsQuery } from '@/sanity/lib/queries';
import type { Testimonial } from '@/types/testimonial';

export async function getTestimonials(category: string) {
	return sanityFetch<Testimonial[]>({ query: testimonialsQuery, params: { category } });
}
