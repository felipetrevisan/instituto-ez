import { getTestimonials } from '@/server/get-testimonials';
import type { TestimonialType } from '@/types/global';
import type { Testimonial } from '@/types/testimonial';
import { useQuery } from '@tanstack/react-query';

export function useTestimonials(category: TestimonialType) {
	const { data, isLoading, isPending } = useQuery<Testimonial[]>({
		queryKey: ['testimonials'],
		queryFn: () => getTestimonials(category),
	});

	return { data, isLoading, isPending };
}
