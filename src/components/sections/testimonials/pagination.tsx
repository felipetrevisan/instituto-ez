import { IconButton } from '@/components/animate-ui/buttons/icon';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useSwiper } from 'swiper/react';

export function SliderPagination() {
	const swiper = useSwiper();

	return (
		<div className="flex justify-center mt-4 gap-4 select-none p-2">
			<IconButton icon={ArrowLeftIcon} onClick={() => swiper.slidePrev()} />
			<IconButton icon={ArrowRightIcon} onClick={() => swiper.slidePrev()} />
		</div>
	);
}
