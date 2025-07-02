'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { pageQuery, pageQueryWithSlug } from '@/sanity/lib/queries';
import type { Page } from '@/types/page';

export async function getPageBySlug(slug: string) {
	return sanityFetch<Page>({ query: pageQueryWithSlug, params: { slug } });
}

export async function getPages() {
	return sanityFetch<Page[]>({ query: pageQuery });
}
