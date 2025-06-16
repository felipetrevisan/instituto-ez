import { getTestimonials } from '@/server/get-testimonials';
import type { Testimonial } from '@/types/testimonial';
import { useQuery } from '@tanstack/react-query';

export function useTestimonials(category: string) {
	const { data, isLoading, isPending } = useQuery<Testimonial[]>({
		queryKey: ['testimonials', category],
		queryFn: () => getTestimonials(category),
	});

	return { data, isLoading, isPending };
}
