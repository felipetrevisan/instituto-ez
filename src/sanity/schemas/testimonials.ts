import { MdRequestQuote } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Depoimentos",
  icon: MdRequestQuote,
  type: "document",
  fields: [
    defineField({
      name: "author_name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "array",
      of: [
        {
          type: "block",
          lists: [],
          styles: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [],
          },
        },
      ],
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
  ],
  preview: {
    select: {
      title: "author_name",
      subtitle: "type",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
});
