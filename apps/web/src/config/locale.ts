export const locales = ['pt', 'en', 'es'] as const
export const defaultLocale = 'pt' as const
export type Language = (typeof locales)[number]

export const localeOptions = [
	{
		id: 'pt',
		shortLabelKey: 'ptShort',
		flag: '/assets/images/flags/brazil.png',
	},
	{
		id: 'en',
		shortLabelKey: 'enShort',
		flag: '/assets/images/flags/usa.png',
	},
	{
		id: 'es',
		shortLabelKey: 'esShort',
		flag: '/assets/images/flags/euro.png',
	},
] as const
