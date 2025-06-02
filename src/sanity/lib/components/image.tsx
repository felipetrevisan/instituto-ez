import { type SanityImageSource, getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { urlForImage } from "../utils";

const ImageComponent = ({ value }: { value: SanityImageSource }) => {
  const { width, height } = getImageDimensions(value);

  return (
    <Image
      src={urlForImage(value).url()}
      alt=""
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
      width={width}
      height={height}
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      className="rounded-2xl overflow-hidden"
    />
  );
};

export default ImageComponent;