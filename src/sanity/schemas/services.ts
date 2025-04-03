import { MdRequestQuote } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Atendimentos",
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
  ],
});
