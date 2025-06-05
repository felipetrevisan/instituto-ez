'use server';

import { EmailTemplate } from '@/components/email-template';
import { env } from '@/config/env';
import type { ContactFormSchema } from '@/types/contact';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(formData: ContactFormSchema, email: string) {
	const { data, error } = await resend.emails.send({
		from: `Contato ${email}`,
		to: [email],
		replyTo: formData.email,
		subject: formData.subject,
		react: EmailTemplate(formData),
	});

	return { data, error };
}
