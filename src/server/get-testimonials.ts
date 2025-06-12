'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { testimonialsQuery } from '@/sanity/lib/queries';
import type { TestimonialType } from '@/types/global';
import type { Testimonial } from '@/types/testimonial';

export async function getTestimonials(category: TestimonialType) {
	return sanityFetch<Testimonial[]>({ query: testimonialsQuery, params: { category } });
}
