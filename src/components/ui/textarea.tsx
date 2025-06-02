import type * as React from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function Textarea({
	className,
	...props
}: React.ComponentProps<typeof motion.textarea>) {
	return (
		<motion.textarea
			data-slot="textarea"
			className={cn(
				'placeholder:text-muted-foreground selection:bg-tertiary selection:text-tertiary-foreground flex h-12 rounded-2xl border-2 border-tertiary/20 bg-input/10 w-full min-w-0 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
