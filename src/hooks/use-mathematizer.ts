import { useQuery } from "@tanstack/react-query";
import { Mathematizer } from "@/types/mathematizer";
import { getMathematizers } from "@/server/get-mathematizer";

export function useMathematizer() {
	const { data, isLoading, isPending } = useQuery<Mathematizer[]>({
		queryKey: ["mathematizers"],
		queryFn: () => getMathematizers(),
	});

	return { data, isLoading, isPending };
}
