'use client';

import { usePage } from '@/hooks/use-page';
import { use } from 'react';
import { Content } from './_content';

export default function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug: [slug] } = use(params);

	console.log(slug);

	const { data, isLoading } = usePage(slug);

	if (isLoading || !data) return <></>;

	return (
		<div className="w-full flex items-center flex-col justify-center space-y-14">
			<section className="section relative flex flex-col gap-20 w-screen items-center justify-center">
				{data.sections.map((section, index) => (
					<Content {...section} key={`${data.id}-${data.slug}-${index}`} />
				))}
			</section>
		</div>
	);
}
