'use server';

import { sanityFetch } from '@/sanity/lib/fetch';
import {
	ebookQuery,
	ebookQueryBySlug,
	ebooksCollectionQuery,
	ebooksCollectionQueryByCollection,
} from '@/sanity/lib/queries';
import type { Ebook, EbookCollection } from '@/types/ebook';

export async function getEbooks() {
	return sanityFetch<Ebook[]>({ query: ebookQuery });
}

export async function getEbookBySlug(slug: string) {
	return sanityFetch<Ebook>({ query: ebookQueryBySlug, params: { slug } });
}

export async function getEbooksCollection() {
	return sanityFetch<EbookCollection[]>({
		query: ebooksCollectionQuery,
	});
}


export async function getEbooksByCollection(collectionId: string) {
	return sanityFetch<EbookCollection>({
		query: ebooksCollectionQueryByCollection,
		params: { id: collectionId },
	});
}
