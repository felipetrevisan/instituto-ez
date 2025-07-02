'use client';

import type { Page } from '@/types/page';;
import { SectionContent } from './_section';

export function Content({ data, slug }: { data: Page; slug: string }) {
	return (
		<>
			{data?.sections.map((section, index) => (
				<section
					key={section.hash}
					id={section.hash}
					data-hash={`${slug}-${section.hash}`}
				>
					<SectionContent {...section} slug={slug} />
				</section>
			))}
		</>
	);
}
