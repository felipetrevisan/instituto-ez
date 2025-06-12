'use client';

import { useSite } from '@/hooks/use-site';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import { Skeleton } from './skeleton';

export function About() {
	const { data, isLoading } = useSite();

	return (
		<div className="flex flex-col w-full gap-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:[grid-template-areas:'left_left_right_right'] xl:[grid-template-areas:'left_right_right_right'] gap-4 w-full h-[900px] md:h-[500px] lg:h-[600px]">
				<div className="relative lg:[grid-area:left] w-full rounded-2xl overflow-hidden bg-[#fff4e5]">
					<Image
						src="/assets/images/slogan.png"
						fill
						alt=""
						priority
						className="w-full h-full object-fill lg:object-contain"
					/>
				</div>
				{isLoading && <Skeleton className="lg:[grid-area:right]" />}
				{!isLoading && data && (
					<div className="relative lg:[grid-area:right] w-full rounded-2xl">
						<Image
							src={urlForImage(data.hero?.[0].background.asset).url()}
							fill
							alt=""
							priority
							className="w-full h-full object-cover rounded-2xl overflow-hidden"
							placeholder="blur"
							blurDataURL={data?.hero?.[0].background.metadata.lqip}
						/>
						<div className="absolute flex flex-col text-secondary bg-white/80 md:bg-white h-max max-h-full w-[320px] md:w-[280px] -top-16 right-1/2 translate-x-1/2 lg:translate-x-0 lg:left-20 p-8 border-4 border-x-0 border-secondary gap-2 rounded-2xl backdrop-blur-lg md:backdrop-blur-none">
							<h2 className="lg:text-3xl font-bold">{data.hero?.[0].title}</h2>
							<p className="font-light">{data.hero?.[0].description}</p>
						</div>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:[grid-template-areas:'left_left_left_right_right_right'] gap-4 w-full h-[900px] md:h-[500px] lg:h-[600px] mb-14">
				{isLoading && <Skeleton className="lg:[grid-area:left]" />}
				{!isLoading && data && (
					<div className="relative lg:[grid-area:left] w-full rounded-2xl">
						<Image
							src={urlForImage(data.hero?.[2].background.asset).url()}
							fill
							alt=""
							priority
							className="w-full h-full object-cover rounded-2xl overflow-hidden"
							placeholder="blur"
							blurDataURL={data.hero?.[2].background.metadata.lqip}
						/>
						<div className="absolute flex flex-col text-secondary bg-white/80 md:bg-white h-max max-h-full w-[320px] md:w-[280px] bottom-12 md:-bottom-16 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 xl:right-20 p-8 border-4 border-x-0 border-secondary gap-2 rounded-2xl backdrop-blur-lg md:backdrop-blur-none">
							<h2 className="lg:text-3xl font-bold">{data?.hero?.[2].title}</h2>
							<p className="font-light">{data.hero?.[2].description}</p>
						</div>
					</div>
				)}
				{isLoading && <Skeleton className="lg:[grid-area:right]" />}
				{!isLoading && data && (
					<div className="relative lg:[grid-area:right] w-full rounded-2xl">
						<Image
							src={urlForImage(data.hero?.[1].background.asset).url()}
							fill
							alt=""
							priority
							className="w-full h-full object-cover rounded-2xl overflow-hidden"
							placeholder="blur"
							blurDataURL={data.hero?.[1].background.metadata.lqip}
						/>
						<div className="absolute flex flex-col text-secondary bg-white/80 md:bg-white h-max max-h-full w-[320px] md:w-[280px] bottom-12 md:-bottom-16 lg:-top-28 right-1/2 translate-x-1/2 lg:right-[100px] lg:translate-x-0 xl:right-72 p-8 border-4 border-x-0 border-secondary gap-2 rounded-2xl backdrop-blur-lg md:backdrop-blur-none">
							<h2 className="lg:text-3xl font-bold">{data?.hero?.[1].title}</h2>
							<p className="font-light">{data.hero?.[1].description}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
