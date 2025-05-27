import { getSiteConfig } from '@/server/get-site-config';
import type { Site } from '@/types/site';
import { useQuery } from '@tanstack/react-query';

export function useSite() {
	const { data, isLoading, isPending } = useQuery<Site>({
		queryKey: ['site'],
		queryFn: () => getSiteConfig(),
	});

	return { data, isLoading, isPending };
}
