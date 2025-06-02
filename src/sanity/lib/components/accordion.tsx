import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type AccordionType = {
	_key: string;
	content: AccordionContentType[];
};

type AccordionContentType = {
	_key: string;
	title: string;
	content: string;
};

const AccordionComponent = ({ value }: { value: AccordionType }) => {
	return (
		<Accordion type="single" collapsible className="flex flex-col">
			{value.content.map(({ _key, title, content }) => (
				<AccordionItem key={_key} value={_key}>
					<AccordionTrigger>
						<span>{title}</span>
					</AccordionTrigger>
					<AccordionContent className="relative px-4 pb-8 pt-0">
						{content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default AccordionComponent;
