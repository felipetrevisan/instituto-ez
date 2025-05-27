'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { trainingQuery } from '@/sanity/lib/queries';
import type { Training } from '@/types/training';

export async function getTrainings() {
	return sanityFetch<Training[]>({ query: trainingQuery });
}
