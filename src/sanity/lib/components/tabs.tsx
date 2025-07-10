import type * as App from '@/components/app';
import { portableComponents } from '@/components/ui/portable-components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Theme, Variant } from '@/types/global';
import type { SanityAsset } from '@/types/sanityAssets';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import * as Icons from 'react-icons/fa';
import { urlForImage } from '../utils';

type TabsType = {
	tabs: TabItem[];
	theme: keyof typeof Theme;
	variant: keyof typeof Variant;
};

type TabItem = {
	title: string;
	id: { current: string };
	content: PortableTextBlock[];
	prefix: 'none' | 'icon' | 'image';
	icon?: { name: keyof typeof App };
	image?: SanityAsset;
};

const TabsComponent = ({ value }: { value: TabsType }) => {
	if (!value.tabs) return null;

	const { tabs, theme, variant } = value;

	const getIcon = (tab: TabItem) => {
		const IconComponent =
			tab.prefix === 'icon' && tab.icon?.name
				? Icons[tab.icon.name as keyof typeof Icons]
				: null;

		const ImageComponent =
			tab.prefix === 'image' && tab.image ? (
				<Image
					src={urlForImage(tab.image.asset).url()}
					alt=""
					width={26}
					height={26}
				/>
			) : null;

		return IconComponent ? <IconComponent /> : ImageComponent;
	};

	const icon = (tab: TabItem) => getIcon(tab);

	return (
		<Tabs defaultValue={tabs[0].id.current}>
			<TabsList theme={theme} variant={variant}>
				{tabs.map((tab) => (
					<TabsTrigger
						key={`tab_${tab.id.current}`}
						value={tab.id.current}
						theme={theme}
						variant={variant}
						className="gap-2"
					>
						{icon && <div>{icon(tab)}</div>} <span>{tab.title}</span>
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent
					key={`tab_content_${tab.id.current}`}
					value={tab.id.current}
				>
					<PortableText value={tab.content} components={portableComponents} />
				</TabsContent>
			))}
		</Tabs>
	);
};

export default TabsComponent;
