import { MdSettingsApplications } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Site Settings",
  icon: MdSettingsApplications,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "string",
      validation: (Rule) => Rule.required().warning("This field must not be empty."),
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
    }),
    defineField({
      name: "hero",
      title: "About",
      type: "array",
      of: [
        defineArrayMember({
          name: "about",
          type: "about",
          title: "About Us"
        }),
        defineArrayMember({
          name: "our-mission",
          type: "about",
          title: "Our Mission"
        }),
        defineArrayMember({
          name: "products",
          type: "about",
          title: "Services & Products"
        }),
      ],
    }),
    defineField({
      name: "main_nav",
      title: "Main Navigation",
      description: "Select a main navigation that is used in header",
      type: "reference",
      to: { type: "navigation" },
      validation: (Rule) =>
        Rule.custom((field, context) =>
          !context?.document?.main_nav && !context?.document?.social_nav
            ? "Main navigation must be configured."
            : true
        ).warning(),
    }),
    defineField({
      name: "social_nav",
      title: "Social Navigation",
      description: "Select a social network navigation",
      type: "reference",
      to: { type: "navigation" },
      validation: (Rule) =>
        Rule.custom((field, context) =>
          !context?.document?.main_nav && !context?.document?.social_nav
            ? "Scial networks links must be configured"
            : true
        ).warning(),
    }),
  ],
});
