import { useQuery } from "@tanstack/react-query";
import { Banner } from "@/types/banner";
import { getBanner } from "@/server/get-banner";

export function useBanner() {
	const { data, isLoading, isPending } = useQuery<Banner[]>({
		queryKey: ["banner"],
		queryFn: () => getBanner(),
	});

	return { data, isLoading, isPending };
}
