'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import { ebookQuery } from '@/sanity/lib/queries';
import type { Ebook } from '@/types/ebook';

export async function getEbooks() {
	return sanityFetch<Ebook[]>({ query: ebookQuery });
}
