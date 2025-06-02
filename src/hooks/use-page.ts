import { getPageBySlug } from '@/server/get-page';
import type { Page } from '@/types/page';
import { useQuery } from '@tanstack/react-query';

export function usePage(slug: string) {
	const { data, isLoading, isPending } = useQuery<Page>({
		queryKey: ['page', slug],
		queryFn: () => getPageBySlug(slug),
	});

	return { data, isLoading, isPending };
}
