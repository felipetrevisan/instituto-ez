import { annotations, decorators } from '@/sanity/lib/portable-components';

const config = [
	{
		type: 'block',
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
	{
		type: 'list',
	},
];

export default config;
