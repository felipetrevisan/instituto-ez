import { getEbookBySlug, getEbooks } from '@/server/get-ebook';
import type { Ebook } from '@/types/ebook';
import { useQuery } from '@tanstack/react-query';
import { SlugInput } from 'sanity';

export function useEbooks() {
	const { data, isLoading, isPending } = useQuery<Ebook[]>({
		queryKey: ['ebooks'],
		queryFn: () => getEbooks(),
	});

	return { data, isLoading, isPending };
}

export function useEbook(slug: string) {
	const { data, isLoading, isPending } = useQuery<Ebook>({
		queryKey: ['ebooks', SlugInput],
		queryFn: () => getEbookBySlug(slug),
	});

	return { data, isLoading, isPending };
}
