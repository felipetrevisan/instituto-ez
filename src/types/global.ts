export type Button = {
	visible: boolean;
	disabled: boolean;
	label: string;
	type: LinkType;
	link: string;
	externalUrl?: string;
};

export enum LinkType {
	EXTERNAL = "EXTERNAL",
	INTERNAL = "INTERNAL",
}
