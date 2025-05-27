import { getMathematizers } from '@/server/get-mathematizer';
import type { Mathematizer } from '@/types/mathematizer';
import { useQuery } from '@tanstack/react-query';

export function useMathematizer() {
	const { data, isLoading, isPending } = useQuery<Mathematizer[]>({
		queryKey: ['mathematizers'],
		queryFn: () => getMathematizers(),
	});

	return { data, isLoading, isPending };
}
