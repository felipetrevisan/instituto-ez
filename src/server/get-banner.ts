'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { bannerQuery } from '@/sanity/lib/queries';
import type { Banner } from '@/types/banner';

export async function getBanner() {
	return sanityFetch<Banner[]>({ query: bannerQuery });
}
