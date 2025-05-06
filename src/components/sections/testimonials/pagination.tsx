import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useSwiper } from "swiper/react";

export function SliderPagination() {
	const swiper = useSwiper();

	return (
		<div className="flex justify-center mt-4 gap-4 select-none p-2">
			<Button
				size="xl"
				icon
				rounded="full"
				variant="outline"
				onClick={() => swiper.slidePrev()}
			>
				<ArrowLeftIcon className="size-4" />
				<span className="sr-only">Previous slide</span>
			</Button>
			<Button
				size="xl"
				icon
				rounded="full"
				variant="outline"
				onClick={() => swiper.slideNext()}
			>
				<ArrowRightIcon className="size-4" />
				<span className="sr-only">Next slide</span>
			</Button>
		</div>
	);
}
