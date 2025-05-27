'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { immersionQuery } from '@/sanity/lib/queries';
import type { Immersion } from '@/types/immersion';

export async function getImmersion() {
	return sanityFetch<Immersion>({ query: immersionQuery });
}
