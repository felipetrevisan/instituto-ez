import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string({
			required_error: "O nome é obrigatório",
		})
		.min(1, { message: "O nome é obrigatório" }),
	email: z
		.string({
			required_error: "O e-mail é obrigatório",
		})
		.email({ message: "Digite um e-mail válido" }),
	subject: z
		.string({
			required_error: "O assunto é obrigatório",
		})
		.min(1, { message: "O assunto é obrigatório" }),
	message: z
		.string({
			required_error: "A mensagem é obrigatória",
		})
		.min(1, { message: "A mensagem é obrigatória" }),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
