import { CustomImage } from "@/sanity/lib/portable-components";
import { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { Button } from "./button";

export const portableComponents: PortableTextComponents = {
  types: {
    image: CustomImage,
    // callToAction: ({value, isInline}) =>
    //   isInline ? (
    //     <a href={value.url}>{value.text}</a>
    //   ) : (
    //     <div className="callToAction">{value.text}</div>
    //   ),
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/${slug.current}`;

      return (
        <Link href={href} passHref>
          <Button variant="outline" rounded="full">
            {children}
          </Button>
        </Link>
      );
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank ? (
        <Link href={href} passHref target="_blank" rel="noopener">
          <Button variant="outline" rounded="full">
            {children}
          </Button>
        </Link>
      ) : (
        <Link href={href} passHref>
          <Button variant="outline" shadow>
            {children}
          </Button>
        </Link>
      );
    },
  },

  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="flex flex-col list-disc gap-2 p-4">{children}</ul>,
    number: ({ children }) => <ol className="flex flex-col list-decimal gap-2 p-4">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => <ol className="flex flex-col text-lg gap-2 p-4">{children}</ol>,
  },
};
