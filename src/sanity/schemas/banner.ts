import { MdMenu } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "Banner",
  icon: MdMenu,
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
      type: "text",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "background_image",
      title: "Background Image",
      type: "image",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
  ],
});
