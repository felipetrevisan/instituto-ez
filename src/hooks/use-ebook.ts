import { getEbookBySlug, getEbooks, getEbooksByCollection, getEbooksCollection } from '@/server/get-ebook';
import type { Ebook, EbookCollection } from '@/types/ebook';
import { useQuery } from '@tanstack/react-query';

export function useEbooks() {
	const { data, isLoading, isPending } = useQuery<Ebook[]>({
		queryKey: ['ebooks'],
		queryFn: () => getEbooks(),
	});

	return { data, isLoading, isPending };
}

export function useEbook(slug: string) {
	const { data, isLoading, isPending } = useQuery<Ebook>({
		queryKey: ['ebooks', slug],
		queryFn: () => getEbookBySlug(slug),
	});

	return { data, isLoading, isPending };
}

export function useEbooksCollection() {
	const { data, isLoading, isPending } = useQuery<EbookCollection[]>({
		queryKey: ['ebooks-collection'],
		queryFn: () => getEbooksCollection(),
	});

	return { data, isLoading, isPending };
}

export function useEbookByCollection(id: string) {
	const { data, isLoading, isPending } = useQuery<EbookCollection>({
		queryKey: ['ebooks', id],
		queryFn: () => getEbooksByCollection(id),
	});

	return { data, isLoading, isPending };
}

