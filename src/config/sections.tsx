import { About } from '@/components/sections/about';
import { AdvancedMentory } from '@/components/sections/advancedMentory';
import { Banner } from '@/components/sections/banner';
import { Immersion } from '@/components/sections/immersion';
import { Lectures } from '@/components/sections/lectures';
import { Mathematizer } from '@/components/sections/mathematizer';
import { Services } from '@/components/sections/services';
import { Testimonials } from '@/components/sections/testimonials';
import { Training } from '@/components/sections/training';
import { Workshops } from '@/components/sections/workshops';
import type { SectionKeys } from '@/types/sections';

export function getSections(): SectionKeys[] {
	return [
		{
			key: 'banner',
			component: <Banner />,
			classes:
				'section relative flex w-screen lg:w-full items-center justify-center',
		},
		{
			key: 'about',
			component: <About />,
			classes: 'section relative flex w-full justify-center bg-white',
		},
		{
			key: 'service',
			component: <Services />,
			classes: 'section relative flex w-full justify-center bg-white',
		},
		{
			key: 'testimonial',
			component: <Testimonials />,
			classes: 'section relative flex w-full justify-center bg-white me-10',
		},
		{
			key: 'immersion',
			component: <Immersion />,
			classes: 'section relative flex flex-col w-screen h-full justify-center',
		},
		{
			key: 'lecture',
			component: <Lectures />,
			classes: 'section relative flex flex-col w-screen h-full justify-center',
		},
		{
			key: 'workshop',
			component: <Workshops />,
			classes: 'section relative flex h-full justify-center bg-white',
		},
		{
			key: 'advanced-mentory',
			component: <AdvancedMentory />,
			classes: 'section relative flex flex-col w-screen h-full justify-center',
		},
		{
			key: 'lecture',
			component: <Lectures />,
			classes: 'section relative flex flex-col w-screen h-full justify-center',
		},
		{
			key: 'mathematizer',
			component: <Mathematizer />,
			classes: 'section relative flex flex-col w-screen h-full justify-center',
		},
		{
			key: 'training',
			component: <Training />,
			classes: 'section relative flex h-full justify-center bg-white',
		},
	];
}
