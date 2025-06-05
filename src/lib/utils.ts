import { type Button, LinkType } from '@/types/global';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLink(button: Button) {
	if (!button.link) return false;

	return !isExternalLink(button)
		? `/${button.link}${button.params ?? ''}`
		: button.externalUrl;
}

export function isExternalLink(button: Button) {
	return button.type === LinkType.EXTERNAL;
}
