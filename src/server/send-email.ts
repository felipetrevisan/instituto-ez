"use server";

// import { EmailTemplateContact } from "@/components/email-template-contact";
import { env } from "@/config/env";
import { ContactFormSchema } from "@/types/contact";

//const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail(formData: ContactFormSchema) {
	// const { data, error } = await resend.emails.send({
	//   from: `${formData.name} <${formData.email}>`,
	//   to: [env.RESEND_TO_EMAIL],
	//   subject: formData.subject,
	//   react: EmailTemplateContact(formData),
	// });

	// return { data, error };
	return false;
}
