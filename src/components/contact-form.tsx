'use client';

import { Button } from '@/components/ui/button';
import { DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { sendEmail } from '@/server/send-email';
import { type ContactFormSchema, contactFormSchema } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ContactForm({
	isDialog = false,
	subject = '',
	onClose,
}: {
	isDialog: boolean;
	subject: string;
	onClose: () => void;
}) {
	const [focusedField, setFocusedField] = useState<string | null>('name');
	const { data } = useSite();

	const fields = [
		{
			name: 'name',
			label: 'Nome',
			type: 'text',
			validation: { required: 'Nome é obrigatório' },
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			validation: { required: 'E-mail é obrigatório' },
		},
		{
			name: 'subject',
			label: 'Assunto',
			type: 'text',
			validation: { required: 'Assunto é obrigatória' },
			className: 'col-span-2',
			readOnly: subject !== '',
		},
		{
			name: 'message',
			label: 'Mensagem',
			type: 'textarea',
			validation: { required: 'Mensagem é obrigatória' },
			className: 'col-span-2',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
		watch,
		reset,
		setValue,
	} = useForm<ContactFormSchema>({
		resolver: zodResolver(contactFormSchema),
	});

	useEffect(() => {
		if (!subject) return;

		setValue('subject', subject, {
			shouldValidate: true,
			shouldDirty: true,
		});
	}, [subject, setValue]);

	async function handleSendForm(formData: ContactFormSchema) {
		if (!data?.contact?.email) {
			toast.warning('Email de destino não está configurado.');
			return false;
		}

		const { data: emailData, error } = await sendEmail(
			formData,
			data.contact.email,
		);

		if (error) {
			toast.warning('Não foi possível enviar a mensagem');
			return false;
		}

		if (emailData?.id) {
			toast.success('Mensagem enviada com sucesso');
			reset();
			onClose();
			return true;
		}

		toast.warning('Não foi possível enviar a mensagem');
		return false;
	}

	return (
		<form onSubmit={handleSubmit(handleSendForm)} className="w-full">
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-8">
					{fields.map(
						({ name, label, type, validation, className, readOnly }) => {
							const value = watch(name as keyof ContactFormSchema);
							const hasError = !!errors[name as keyof ContactFormSchema];
							const isFocused = focusedField === name || !!value;

							return (
								<motion.div
									key={name}
									animate={hasError ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
									transition={{ duration: 0.4 }}
									className={cn('relative', className)}
								>
									<motion.label
										className={cn(
											'absolute left-5 text-secondary font-semibold font-oswald pointer-events-none origin-left',
											{
												'text-red-500': hasError,
												'text-tertiary': isFocused,
											},
										)}
										animate={
											isFocused
												? {
														y: -30,
														left: 10,
														scale: 0.8,
														opacity: 1,
														fontSize: '20px',
													}
												: { y: 10, scale: 1, opacity: 0.5 }
										}
										transition={{ duration: 0.25 }}
										htmlFor={name}
									>
										{label}
									</motion.label>
									{type === 'textarea' ? (
										<Textarea
											{...register(name as keyof ContactFormSchema, validation)}
											onFocus={() => setFocusedField(name)}
											onBlur={() => setFocusedField(null)}
											className={cn('transition-colors', {
												'border-red-500': hasError,
											})}
											rows={20}
											style={{ resize: 'none' }}
											animate={{
												borderRadius: isFocused ? '1rem' : '1.25rem',
												height: isFocused ? 250 : 100,
											}}
											initial={{ height: 200 }}
										/>
									) : (
										<Input
											type={type}
											{...register(name as keyof ContactFormSchema, validation)}
											onFocus={() => setFocusedField(name)}
											onBlur={() => setFocusedField(null)}
											className={cn('transition-colors', {
												'border-red-500': hasError,
											})}
											animate={{
												borderRadius: isFocused ? '1rem' : '1.25rem',
											}}
											readOnly={readOnly}
										/>
									)}
									<AnimatePresence>
										{hasError && (
											<motion.p
												className="text-sm text-red-500 mt-1"
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -5 }}
											>
												{errors[name as keyof ContactFormSchema]?.message}
											</motion.p>
										)}
									</AnimatePresence>
								</motion.div>
							);
						},
					)}
				</div>
			</div>
			{isDialog && (
				<DialogFooter className="gap-5">
					<DialogTrigger asChild>
						<Button
							type="button"
							variant="outline"
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
						disabled={isSubmitting || !isValid}
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
						disabled={isSubmitting || !isValid}
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
