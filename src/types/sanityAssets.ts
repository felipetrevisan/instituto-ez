import { SanityImageSource } from "@sanity/asset-utils";
import { ImageMetadata } from "sanity";

export type SanityAsset = {
	asset: SanityImageSource;
	metadata: Pick<ImageMetadata, "lqip" | "dimensions">;
};
