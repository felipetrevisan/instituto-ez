import type { ReactNode } from 'react';

export type Section = {
	key: string;
	show: boolean;
	title?: string;
	subtitle?: string;
};

export type SectionKeys = {
	key: string;
	component: ReactNode;
	classes?: string;
};
