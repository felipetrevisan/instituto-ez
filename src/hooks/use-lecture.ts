import { getLectures } from '@/server/get-lectures';
import type { Lecture } from '@/types/lecture';
import { useQuery } from '@tanstack/react-query';

export function useLecture() {
	const { data, isLoading, isPending } = useQuery<Lecture[]>({
		queryKey: ['lectures'],
		queryFn: () => getLectures(),
	});

	return { data, isLoading, isPending };
}
