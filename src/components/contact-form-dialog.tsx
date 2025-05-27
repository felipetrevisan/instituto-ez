import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useApp } from '@/hooks/use-app';
import { ContactForm } from './contact-form';

export function ContactFormDialog() {
	const { setIsContactDialogOpen } = useApp();

	const closeDialog = () => {
		setIsContactDialogOpen(false);
	};

	return (
		<DialogContent
			className="container max-w-3xl"
			onEscapeKeyDown={closeDialog}
		>
			<DialogHeader>
				<DialogTitle>Como podemos te ajudar?</DialogTitle>
			</DialogHeader>

			<ContactForm isDialog onClose={closeDialog} />
		</DialogContent>
	);
}
