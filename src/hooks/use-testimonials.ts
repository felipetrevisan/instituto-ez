import { getTestimonials } from '@/server/get-testimonials';
import type { Testimonial } from '@/types/testimonial';
import { useQuery } from '@tanstack/react-query';

export function useTestimonials() {
	const { data, isLoading, isPending } = useQuery<Testimonial[]>({
		queryKey: ['testimonials'],
		queryFn: () => getTestimonials(),
	});

	return { data, isLoading, isPending };
}
