import { MdMenu } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "navigation",
	title: "Navigation",
	icon: MdMenu,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) =>
				Rule.required().warning("This field must not be empty."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) =>
				Rule.required().warning("This field must not be empty."),
		}),
		defineField({
			name: "is_social_network",
			title: "Is Social Network?",
			type: "boolean",
			initialValue: false,
			validation: (Rule) =>
				Rule.required().warning("This field must not be empty."),
		}),
		defineField({
			name: "items",
			title: "Navigation items",
			type: "array",
			of: [{ type: "navigationItem" }],
			hidden: ({ parent }) => !parent?.is_social_network,
			validation: (Rule) =>
				Rule.custom((items, context) => {
					const isSocial = context?.document?.is_social_network ?? false;
					if (!isSocial && (!items || items.length === 0)) {
						return "The navigation must have at least one item.";
					}
					return true;
				}).warning(),
		}),
		defineField({
			name: "social_items",
			title: "Social Network items",
			type: "array",
			of: [{ type: "socialNetworksItem" }],
			hidden: ({ parent }) => !parent?.is_social_network,
			validation: (Rule) =>
				Rule.custom((items, context) => {
					const isSocial = context?.document?.is_social_network ?? false;
					if (isSocial && (!items || items.length === 0)) {
						return "The navigation must have at least one item.";
					}
					return true;
				}).warning(),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: title ?? "Navegação sem título",
			};
		},
	},
});
