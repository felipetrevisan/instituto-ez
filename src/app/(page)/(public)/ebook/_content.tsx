'use client';

import { Card, CardContent } from '@/components/ui/card';

export function Content() {
	// const countWorks = useMotionValue(0);
	// const rounded = useTransform(countWorks, (latest) => Math.round(latest));

	// useEffect(() => {
	// 	const animation = animate(countWorks, 18, { duration: 2 });

	// 	return animation.stop;
	// }, []);
	return (
		<>
			<header className="bg-orange-500 text-white py-12 px-6 w-screen relative">
				<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
					<div className="max-w-xl">
						<h1 className="text-4xl font-bold mb-4">
							Perfect Landing Page Template to Present Your eBook
						</h1>
						<p className="mb-6">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam
							sapien, recusandae voluptas incidunt.
						</p>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="bg-white text-orange-500 px-6 py-3 font-bold rounded shadow">
							Download Now!
						</button>
						<p className="text-sm mt-2">
							*Available in PDF, ePUB, Mobi & Kindle.
						</p>
					</div>
					<img
						src="/mnt/data/WhatsApp Image 2025-06-24 at 16.23.40.jpeg"
						alt="Book Cover"
						className="w-64 mt-6 md:mt-0"
					/>
				</div>
				<div className="absolute left-0 -rotate-2">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
						className="relative block w-[calc(300%+1.3px)] h-[248px]"
					>
						<path
							d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
							className="fill-orange-500"
						/>
					</svg>
				</div>
			</header>
			<section className="bg-white py-12 px-6">
				<Card>
					{/* <CardContent></CardContent> */}
				</Card>
			</section>
		</>
	);
}
