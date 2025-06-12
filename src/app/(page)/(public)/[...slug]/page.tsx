'use client';

import { ScrollToHash } from '@/components/scroll-to-hash';
import { usePage } from '@/hooks/use-page';
import { use } from 'react';
import { Content } from './_content';

export default function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const {
		slug: [slug],
	} = use(params);

	const { data, isLoading } = usePage(slug);

	if (isLoading || !data) return <></>;

	return (
		<div className="w-full flex items-center flex-col justify-center space-y-14">
			<div className="relative flex flex-col gap-20 w-screen items-center justify-center">
				<ScrollToHash />
				{data.sections.map((section, index) => (
					<section key={section.hash} id={section.hash}>
						<Content {...section} />
					</section>
				))}
			</div>
		</div>
	);
}