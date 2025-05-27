'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { pageQuery } from '@/sanity/lib/queries';
import type { Page } from '@/types/page';

export async function getPageBySlug(slug: string) {
	return sanityFetch<Page>({ query: pageQuery, params: { slug } });
}
