import { useQuery } from "@tanstack/react-query";
import { Training } from "@/types/training";
import { getTrainings } from "@/server/get-trainings";

export function useTraining() {
  const { data, isLoading, isPending } = useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: () => getTrainings(),
  });

  return { data, isLoading, isPending };
}
