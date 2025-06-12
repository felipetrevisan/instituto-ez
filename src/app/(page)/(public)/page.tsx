import * as App from '@/components/app';
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
			{sections?.map(({ key, show, title, subtitle }) =>
				show ? (
					<section className={avaliableSections[key]?.classes || ''} key={key}>
						{title && (
							<App.PageHeader>
								<App.Title>{title}</App.Title>
								{subtitle && <App.Subtitle size="xl">{subtitle}</App.Subtitle>}
							</App.PageHeader>
						)}
						{avaliableSections[key]?.component}
					</section>
				) : null,
			)}
		</div>
	);
}
