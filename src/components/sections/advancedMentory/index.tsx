'use client';

import { ButtonLink } from '@/components/app';
import { Button } from '@/components/ui/button';
import { portableComponents } from '@/components/ui/portable-components';
import { useAdvancedMentory } from '@/hooks/use-advanced-mentory';
import { getLink } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { Parallax } from 'react-parallax';

export function AdvancedMentory() {
	const { data, isLoading } = useAdvancedMentory();

	if (isLoading || !data) return <></>;

	const link = getLink(data?.button);

	return (
		<>
			<div className="relative flex flex-col items-center w-full h-full bg-muted p-40 gap-10">
				<div className="absolute top-0 left-0 w-full overflow-hidden z-10">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
						className="relative w-[calc(141%+1.3px)] h-[85px]"
					>
						<path
							d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
							opacity=".25"
							className="fill-white"
						/>
						<path
							d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
							opacity=".5"
							className="fill-white"
						/>
						<path
							d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
							className="fill-white"
						/>
					</svg>
				</div>
				<Parallax
					bgImage={urlForImage(data?.background.asset).url()}
					strength={-200}
					className="flex justify-center xl:w-3/4 w-[calc(100vw-10%)] xl:h-[400px] h-[300px] overflow-hidden rounded-lg"
				/>
				<div className="flex justify-center xl:w-3/5 w-[calc(100vw-20%)] h-full -m-40 mb-4 z-10 bg-white/90 backdrop-blur-lg rounded-lg">
					<div className="flex flex-col justify-start items-center w-full text-secondary p-10 gap-10 overflow-hidden relative">
						{data?.ribbon.show && (
							<div className="absolute transform -rotate-45 bg-red-800 text-center text-white font-semibold py-1 left-[-35px] top-[32px] w-[170px] uppercase animate-pulse">
								{data?.ribbon.text}
							</div>
						)}
						<div className="flex flex-col items-start justify-start">
							<h3 className="clamp-[text,xl,4xl] text-center lg:text-left font-bold font-oswald">
								{data?.title}
							</h3>
						</div>
						<div className="font-light text-justify text-md font-questrial leading-7">
							<PortableText value={data?.content} components={portableComponents} />
						</div>
					</div>
				</div>
				{data?.button.visible && (
					<ButtonLink
						href={link as string}
						disabled={data?.button.disabled}
						className="flex justify-center w-[calc(100vw-20%)] xl:w-3/5"
					>
						<Button
							variant="default"
							theme="tertiary"
							rounded="xl"
							size="2xl"
							className="uppercase font-bold w-full"
							disabled={data?.button.disabled}
						>
							{data?.button.label}
						</Button>
					</ButtonLink>
				)}
			</div>
			<div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="relative w-[calc(141%+1.3px)] h-[85px]"
				>
					<path
						d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
						opacity=".25"
						className="fill-white"
					/>
					<path
						d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
						opacity=".5"
						className="fill-white"
					/>
					<path
						d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
						className="fill-white"
					/>
				</svg>
			</div>
		</>
	);
}
