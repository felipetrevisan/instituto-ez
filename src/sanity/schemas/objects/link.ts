import { MdLink } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "link",
	title: "Link",
	type: "object",
	icon: MdLink,
	fields: [
		defineField({
			name: "is_home",
			title: "Is Home?",
			description: "Select if the menu item should redirect to home",
			type: "boolean",
			initialValue: false,
			validation: (Rule) =>
				Rule.required().warning("This field must not be empty."),
		}),
		defineField({
			name: "link_type",
			title: "Link Type",
			type: "string",
			initialValue: "INTERNAL",
			options: {
				list: [
					{ title: "Page", value: "INTERNAL" },
					{ title: "External Link", value: "EXTERNAL" },
				],
				layout: "radio",
			},
			hidden: ({ parent }) => parent?.is_home,
			validation: (Rule) =>
				Rule.custom((field, context) =>
					!context?.document?.is_home && !field
						? "This field must not be empty."
						: true,
				).warning(),
		}),
		defineField({
			name: "internal_link",
			title: "Internal Link",
			description: "Select a page or post to navigate",
			type: "reference",
			to: [{ type: "page" }],
			hidden: ({ parent }) =>
				parent?.link_type !== "INTERNAL" || parent?.is_home,
			validation: (Rule) =>
				Rule.custom((field, context) =>
					!context?.document?.is_home &&
					context?.document?.link_type === "INTERNAL" &&
					!field
						? "This field must not be empty."
						: true,
				).warning(),
		}),
		defineField({
			name: "external_url",
			title: "External Link",
			description: "Enter the URL",
			type: "url",
			hidden: ({ parent }) =>
				parent?.link_type !== "EXTERNAL" || parent?.is_home,
			validation: (Rule) =>
				Rule.uri({
					scheme: ["http", "https"],
				}).warning("This field must be a valid url."),
		}),
	],
});
