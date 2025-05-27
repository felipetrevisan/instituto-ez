import { getTrainings } from '@/server/get-trainings';
import type { Training } from '@/types/training';
import { useQuery } from '@tanstack/react-query';

export function useTraining() {
	const { data, isLoading, isPending } = useQuery<Training[]>({
		queryKey: ['trainings'],
		queryFn: () => getTrainings(),
	});

	return { data, isLoading, isPending };
}
