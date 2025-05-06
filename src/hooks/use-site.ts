import { useQuery } from "@tanstack/react-query";
import { Site } from "@/types/site";
import { getSiteConfig } from "@/server/get-site-config";

export function useSite() {
	const { data, isLoading, isPending } = useQuery<Site>({
		queryKey: ["site"],
		queryFn: () => getSiteConfig(),
	});

	return { data, isLoading, isPending };
}
