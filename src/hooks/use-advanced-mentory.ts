import { useQuery } from "@tanstack/react-query";
import { AdvancedMentory } from "@/types/advanced-mentory";
import { getAdvancedMentory } from "@/server/get-advanced-mentory";

export function useAdvancedMentory() {
  const { data, isLoading, isPending } = useQuery<AdvancedMentory>({
    queryKey: ["advanced-mentory"],
    queryFn: () => getAdvancedMentory(),
  });

  return { data, isLoading, isPending };
}
