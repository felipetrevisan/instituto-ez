import { MdNavigation } from "react-icons/md";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "socialNetworksItem",
	title: "Social Networks Item",
	type: "object",
	icon: MdNavigation,
	fields: [
		defineField({
			name: "social_network_label",
			title: "Social Network Label",
			type: "string",
			validation: (Rule) => Rule.required().warning(),
		}),
		defineField({
			name: "social_network_icon",
			title: "Social Network Icon",
			type: "string",
			validation: (Rule) => Rule.required().warning(),
		}),
		defineField({
			name: "social_network_url",
			title: "Social Network URl",
			type: "url",
			validation: (Rule) => Rule.required().warning(),
		}),
	],
});
