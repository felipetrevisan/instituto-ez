import { MdRequestQuote } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "immersion",
  title: "Imersão",
  icon: MdRequestQuote,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              {
                title: "Highlight",
                value: "highlight",
                icon: () => "H",
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "button",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "ribbon",
      title: "Ribbon",
      type: "ribbon",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
  ],
});
