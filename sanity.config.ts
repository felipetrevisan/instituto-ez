import { theme } from 'https://themer.sanity.build/api/hues?default=49197f;600&primary=3f156e;600&transparent=4b395f;600&positive=43d675;300&caution=fbd024;200&lightest=fcfcfd&darkest=110d16';
import { visionTool } from '@sanity/vision';
import { type PluginOptions, defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { structureTool } from 'sanity/structure';

import { env } from '@/config/env';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { schema } from '@/sanity/schema';
import structure from '@/sanity/structures';

export default defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	schema,
	theme,
	studio: {
		components: {
			toolMenu: (props) => {
				const { tools, renderDefault } = props;
				const structureTool = tools.find(({ name }) => name === 'structure');
				const otherTools = tools.filter(({ name }) => name !== 'structure');

				if (!structureTool) {
					return renderDefault(props);
				}

				return props.renderDefault({
					...props,
					tools: [structureTool, ...otherTools],
				});
			},
		},
	},
	plugins: [
		structureTool({
			structure,
		}),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		iconPicker(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		env.NODE_ENV === 'development' &&
			visionTool({ defaultApiVersion: apiVersion }),
	].filter(Boolean) as PluginOptions[],
});
