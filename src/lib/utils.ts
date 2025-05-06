import { Button, LinkType } from "@/types/global";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLink(button: Button) {
	return button.type === LinkType.INTERNAL
		? `/${button.link}`
		: button.externalUrl!;
}
