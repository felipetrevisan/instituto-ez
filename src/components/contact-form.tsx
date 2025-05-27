import { Button } from '@/components/ui/button';
import { DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { useToast } from "@/components/ui/use-toast";
import { type ContactFormSchema, contactFormSchema } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

export function ContactForm({
	isDialog = false,
	onClose,
}: {
	isDialog: boolean;
	onClose: () => void;
}) {
	// const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		reset,
	} = useForm<ContactFormSchema>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
		},
	});

	async function handleSendForm(formData: ContactFormSchema) {
		//   const { data, error } = await sendEmail(formData);
		//   if (error) {
		//     toast({
		//       title: "Não foi possível enviar a mensagem",
		//       variant: "destructive",
		//     });
		//     return false;
		//   }
		//   if (data?.id) {
		//     toast({
		//       title: "Mensagem enviada com sucesso",
		//       variant: "success",
		//     });
		//     reset();
		//   }
		onClose();
	}

	return (
		<form onSubmit={handleSubmit(handleSendForm)} className="w-full">
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-4">
					<div>
						<div className="col-span-3 space-y-4">
							<Input
								id="name"
								placeholder="Seu nome"
								disabled={isSubmitting}
								{...register('name')}
							/>
							{errors.name && (
								<p className="flex items-center gap-1 text-sm font-medium text-secondary">
									<InfoIcon /> {errors.name.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className="col-span-3 space-y-4">
							<Input
								id="email"
								placeholder="E-mail"
								disabled={isSubmitting}
								icon={MdEmail}
								{...register('email')}
							/>
							{errors.email && (
								<p className="flex items-center gap-1 text-sm font-medium text-secondary">
									<InfoIcon />
									{errors.email.message}
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 items-baseline gap-4">
					<div className="col-span-2 space-y-4">
						<Input
							id="subject"
							placeholder="Assunto"
							disabled={isSubmitting}
							{...register('subject')}
						/>
						{errors.subject && (
							<p className="flex items-center gap-1 text-sm font-medium text-secondary">
								<InfoIcon />
								{errors.subject.message}
							</p>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 items-baseline gap-4">
					<div className="col-span-2 space-y-4">
						<Textarea
							id="message"
							placeholder="Mensagem"
							rows={4}
							disabled={isSubmitting}
							{...register('message')}
						/>
						{errors.message && (
							<p className="flex items-center gap-1 text-sm font-medium text-secondary">
								<InfoIcon />
								{errors.message.message}
							</p>
						)}
					</div>
				</div>
			</div>
			{isDialog && (
				<DialogFooter>
					<DialogTrigger asChild>
						<Button
							type="button"
							variant="default"
							theme="tertiary"
							size="xl"
							rounded="2xl"
							className="w-40"
							onClick={onClose}
						>
							Cancelar
						</Button>
					</DialogTrigger>
					<Button
						variant="default"
						theme="default"
						size="xl"
						type="submit"
						rounded="2xl"
						disabled={isSubmitting}
						className="w-40"
					>
						{isSubmitting ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							'Enviar'
						)}
					</Button>
				</DialogFooter>
			)}
			{!isDialog && (
				<div className="flex flex-row md:justify-end">
					<Button
						variant="default"
						size="xl"
						type="submit"
						rounded="full"
						disabled={isSubmitting}
						shadow
						className="md:w-[200px] w-full"
					>
						{isSubmitting ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							'Enviar'
						)}
					</Button>
				</div>
			)}
		</form>
	);
}
