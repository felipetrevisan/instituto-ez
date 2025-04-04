import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@/types/testimonial";
import { getTestimonials } from "@/server/get-testimonials";

export function useTestimonials() {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(),
  });

  return { data, isLoading, isPending };
}
