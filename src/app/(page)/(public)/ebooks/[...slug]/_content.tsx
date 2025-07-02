'use client';

import type { Ebook } from '@/types/ebook';

export function Content({ title }: Ebook) {
	return (
		<header className="bg-orange-500 text-white py-12 px-6">
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
		</header>
	);
}
