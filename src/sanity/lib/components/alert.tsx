import {
	Alert,
	AlertDescription,
	AlertTitle,
	type alertVariants,
} from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import * as Icons from 'react-icons/fa';

type AlertVariants = VariantProps<typeof alertVariants>;

type AlertType = {
	variant: AlertVariants['variant'];
	theme: AlertVariants['theme'];
	icon: { name: keyof typeof Icons };
	title: string;
	message: string;
};

const AlertComponent = ({ value }: { value: AlertType }) => {
	const { variant, theme, icon, title, message } = value;

	const IconComponent = icon?.name ? Icons[icon.name] : null;

	return (
		<div className={cn('flex justify-center relative')}>
			<Alert variant={variant} theme={theme}>
				<AlertTitle>
					{IconComponent && <IconComponent size={20} />}
					{title}
				</AlertTitle>
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		</div>
	);
};

export default AlertComponent;
