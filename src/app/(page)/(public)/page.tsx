// import { About as AboutComponent } from '@/components/sections/about';
// import { AdvancedMentory as AdvancedMentoryComponent } from '@/components/sections/advancedMentory';
// import { Banner as BannerComponent } from '@/components/sections/banner';
// import { Immersion as ImmersionComponent } from '@/components/sections/immersion';
// import { Lectures as LecturesComponent } from '@/components/sections/lectures';
// import { Mathematizer as MathematizerComponent } from '@/components/sections/mathematizer';
// import { Services as ServicesComponent } from '@/components/sections/services';
// import { Testimonials as TestimonialsComponent } from '@/components/sections/testimonials';
// import { Training as TrainingComponent } from '@/components/sections/training';
// import { Workshops as WorkshopsComponent } from '@/components/sections/workshops';

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
			{/* <section className="section relative flex w-screen lg:w-full items-center justify-center">
				<BannerComponent />
			</section>
			<section className="section relative flex w-full justify-center bg-white">
				<AboutComponent />
			</section>
			<section className="section relative flex w-full justify-center bg-white">
				<ServicesComponent />
			</section>
			<section className="section relative flex w-full justify-center bg-white">
				<TestimonialsComponent />
			</section>
			<section className="section relative flex flex-col w-screen h-full justify-center">
				<ImmersionComponent />
			</section>
			<section className="section relative flex flex-col w-screen h-full justify-center">
				<LecturesComponent />
			</section>
			<section className="section relative flex h-full justify-center bg-white">
				<WorkshopsComponent />
			</section>
			<section className="section relative flex flex-col w-screen h-full justify-center">
				<AdvancedMentoryComponent />
			</section>
			<section className="section relative flex flex-col w-screen h-full justify-center">
				<MathematizerComponent />
			</section>
			<section className="section relative flex h-full justify-center bg-white">
				<TrainingComponent />
			</section> */}
		</div>
	);
}
