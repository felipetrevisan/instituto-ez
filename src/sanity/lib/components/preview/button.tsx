import { Button, type buttonVariants } from '@/components/ui/button';
import { Card, Stack } from '@sanity/ui';
import type { VariantProps } from 'class-variance-authority';
import type { BlockProps, PortableTextObject } from 'sanity';

type ButtonVariants = VariantProps<typeof buttonVariants>;

const ButtonPreviewComponent = (props: BlockProps) => {
	const { renderDefault, value } = props;

	const valueRaw = value as PortableTextObject;
	const variant = (valueRaw.variant as ButtonVariants['variant']) || 'default';
	const theme = (valueRaw.theme as ButtonVariants['theme']) || 'default';
	const rounded = (valueRaw.rounded as ButtonVariants['rounded']) || 'none';
	const fullWidth =
		(valueRaw.fullWidth as ButtonVariants['fullWidth']) || false;
	const label = valueRaw.label as string;

	return (
		<Card tone="primary" scheme="dark" padding={[2, 2, 3]}>
			<Stack space={4}>
				{renderDefault({ ...props })}
				<Card padding={[4, 5, 6]}>
					<Stack space={4}>
						<Button
							variant={variant}
							theme={theme}
							size="lg"
							rounded={rounded}
							fullWidth={fullWidth}
							className="p-5 font-bold"
						>
							{label}
						</Button>
					</Stack>
				</Card>
			</Stack>
		</Card>
	);
};

export default ButtonPreviewComponent;
