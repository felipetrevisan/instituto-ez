import { Divider, type dividerVariants } from '@/components/ui/divider';
import type { VariantProps } from 'class-variance-authority';

type DividerVariants = VariantProps<typeof dividerVariants>;

type DividerType = {
	theme: DividerVariants['theme'];
};

const DividerComponent = ({ value }: { value: DividerType }) => {
	return <Divider theme={value.theme} />;
};

export default DividerComponent;
