import { getEbooks } from '@/server/get-ebook';
import type { Ebook } from '@/types/ebook';
import { useQuery } from '@tanstack/react-query';

export function useEbook() {
	const { data, isLoading, isPending } = useQuery<Ebook[]>({
		queryKey: ['ebook'],
		queryFn: () => getEbooks(),
	});

	return { data, isLoading, isPending };
}
