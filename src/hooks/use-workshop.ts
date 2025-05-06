import { useQuery } from "@tanstack/react-query";
import { Workshop } from "@/types/workshop";
import { getWorkshops } from "@/server/get-workshop";

export function useWorkshop() {
	const { data, isLoading, isPending } = useQuery<Workshop[]>({
		queryKey: ["workshops"],
		queryFn: () => getWorkshops(),
	});

	return { data, isLoading, isPending };
}
