import { useQuery } from "@tanstack/react-query";
import { Immersion } from "@/types/immersion";
import { getImmersion } from "@/server/get-immersion";

export function useImmersion() {
	const { data, isLoading, isPending } = useQuery<Immersion>({
		queryKey: ["immersion"],
		queryFn: () => getImmersion(),
	});

	return { data, isLoading, isPending };
}
