import {
	annotations,
	decorators,
	styles,
} from '@/sanity/lib/portable-components';

const config = [
	{
		type: 'block',
		styles,
		marks: {
			decorators,
			annotations,
		},
	},
	{
		type: 'buttonLink',
	},
	{
		type: 'image',
	},
	{
		type: 'title',
	},
	{
		type: 'accordion',
	},
	{
		type: 'alert',
	},
	{
		type: 'divider',
	},
	{
		type: 'testimonialWidget',
	},
	{
		type: 'ebooksWidget',
	},
];

export default config;
