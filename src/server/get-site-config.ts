'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { siteConfigQuery } from '@/sanity/lib/queries';
import type { Site } from '@/types/site';

export async function getSiteConfig() {
	return sanityFetch<Site>({ query: siteConfigQuery });
}
