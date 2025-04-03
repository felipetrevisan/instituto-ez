import { MdRequestQuote } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "training",
  title: "Treinamentos",
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
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
  ]
});
