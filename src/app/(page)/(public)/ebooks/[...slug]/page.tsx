'use client';

import { useEbook } from '@/hooks/use-ebook';
import { Bar, Progress, Spinner, SpinnerIcon } from '@bprogress/next';
import { use } from 'react';
import { Content } from './_content';

export default function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const {
		slug: [slug],
	} = use(params);

	const { data, isLoading } = useEbook(slug);

	return (
		<div className="w-full flex items-center flex-col justify-center space-y-14">
			<div className="relative flex flex-col gap-20 w-screen items-center justify-center">
				{isLoading && (
					<Progress>
						<Bar className="!absolute z-[9999] !bottom-0 !top-auto" />
						<Spinner className="!top-16">
							<SpinnerIcon />
						</Spinner>
					</Progress>
				)}
				{/* <Content {...data} /> */}
			</div>
		</div>
	);
}

