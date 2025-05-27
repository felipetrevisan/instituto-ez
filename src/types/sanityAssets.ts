import type { SanityImageSource } from '@sanity/asset-utils';
import type { ImageMetadata } from 'sanity';

export type SanityAsset = {
	asset: SanityImageSource;
	metadata: Pick<ImageMetadata, 'lqip' | 'dimensions'>;
};
