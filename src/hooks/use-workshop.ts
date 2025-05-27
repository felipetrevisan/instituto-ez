import { getWorkshops } from '@/server/get-workshop';
import type { Workshop } from '@/types/workshop';
import { useQuery } from '@tanstack/react-query';

export function useWorkshop() {
	const { data, isLoading, isPending } = useQuery<Workshop[]>({
		queryKey: ['workshops'],
		queryFn: () => getWorkshops(),
	});

	return { data, isLoading, isPending };
}
