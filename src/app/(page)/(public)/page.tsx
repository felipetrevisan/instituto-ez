import { getSections } from '@/config/sections';
import { getSiteConfig } from '@/server/get-site-config';
import type { SectionKeys } from '@/types/sections';

export default async function Page() {
	const { sections } = await getSiteConfig();
	
	const avaliableSections = getSections().reduce(
		(acc, section) => {
			acc[section.key] = section;
			return acc;
		},
		{} as Record<string, SectionKeys>,
	);

	return (
		<div className="w-full flex items-center flex-col justify-center gap-20">
			{sections?.map(({ key, show }) =>
				show ? (
					<section className={avaliableSections[key]?.classes || ''} key={key}>
						{avaliableSections[key]?.component}
					</section>
				) : null,
			)}
		</div>
	);
}
