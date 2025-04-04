import { useQuery } from "@tanstack/react-query";
import { Lecture } from "@/types/lecture";
import { getLectures } from "@/server/get-lectures";

export function useLecture() {
  const { data, isLoading, isPending } = useQuery<Lecture[]>({
    queryKey: ["lectures"],
    queryFn: () => getLectures(),
  });

  return { data, isLoading, isPending };
}
