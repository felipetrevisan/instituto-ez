import * as App from '@/components/app';
import type { VariantProps } from 'class-variance-authority';

type TitleVariants = VariantProps<typeof App.titleVariants>;

type TitleType = {
	variant: TitleVariants['variant'];
	size: TitleVariants['size'];
	title: string;
	subtitle?: string;
};

const TitleComponent = ({ value }: { value: TitleType }) => {
	const { title, subtitle, variant, size } = value;

	return (
		<div className="flex flex-col w-full">
			<App.Title variant={variant} size={size} separator>
				{title}
			</App.Title>
			{subtitle && (
				<App.Subtitle variant={variant} size={size} className="mt-0">
					{subtitle}
				</App.Subtitle>
			)}
		</div>
	);
};

export default TitleComponent;
