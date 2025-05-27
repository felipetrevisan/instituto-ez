import { getBanner } from '@/server/get-banner';
import type { Banner } from '@/types/banner';
import { useQuery } from '@tanstack/react-query';

export function useBanner() {
	const { data, isLoading, isPending } = useQuery<Banner[]>({
		queryKey: ['banner'],
		queryFn: () => getBanner(),
	});

	return { data, isLoading, isPending };
}
