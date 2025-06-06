'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { workshopQuery } from '@/sanity/lib/queries';
import type { Workshop } from '@/types/workshop';

export async function getWorkshops() {
	return sanityFetch<Workshop[]>({ query: workshopQuery });
}
