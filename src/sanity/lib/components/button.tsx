import { Button, type buttonVariants } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { Link } from 'lucide-react';
import * as Icons from 'react-icons/fa';

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonType = {
	link: { slug: { current: string } };
	variant: ButtonVariants['variant'];
	theme: ButtonVariants['theme'];
	size: ButtonVariants['size'];
	rounded: ButtonVariants['rounded'];
	fullWidth: ButtonVariants['fullWidth'];
	label: string;
	action: 'link' | 'dialog';
	subject: '';
	icon: { name: keyof typeof Icons };
};

const ButtonComponent = ({ value }: { value: ButtonType }) => {
	const { setIsContactDialogOpen, setContactSubject } = useApp();

	const {
		label,
		link,
		variant,
		theme,
		size,
		rounded,
		fullWidth,
		action,
		icon,
		subject,
	} = value;

	const IconComponent = icon?.name ? Icons[icon.name] : null;

	const handleClick = () => {
		if (action === 'dialog') {
			setIsContactDialogOpen(true);
			setContactSubject(subject);
		}
	};

	const path = link?.slug?.current ? `/${link.slug.current}` : '/';

	const button = (
		<Button
			variant={variant}
			theme={theme}
			size={size}
			rounded={rounded}
			fullWidth={fullWidth}
			className="p-5 font-bold"
			onClick={action === 'dialog' ? handleClick : undefined}
		>
			{IconComponent && <IconComponent />}
			{label}
		</Button>
	);

	return (
		<div className={cn('flex justify-center', { 'w-full': fullWidth })}>
			{action === 'link' ? (
				<Link href={path} className={cn({ 'w-full': fullWidth })}>
					{button}
				</Link>
			) : (
				button
			)}
		</div>
	);
};

export default ButtonComponent;
