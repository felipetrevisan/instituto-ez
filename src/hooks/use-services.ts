import { useQuery } from "@tanstack/react-query";
import { Service } from "@/types/service";
import { getServices } from "@/server/get-services";

export function useServices() {
  const { data, isLoading, isPending } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
  });

  return { data, isLoading, isPending };
}
