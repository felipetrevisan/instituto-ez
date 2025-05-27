import type { ReactNode } from 'react';

export type Section = {
	key: string;
	show: boolean;
};

export type SectionKeys = {
	key: string;
	component: ReactNode;
	classes?: string;
};
