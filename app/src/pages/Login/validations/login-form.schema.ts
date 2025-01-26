import { z } from 'zod';

const messages = {
  invalid_email: 'E-mail inválido',
  invalid_type_email: 'E-mail obrigatório',
  invalid_type_password: 'Senha obrigatória',
};

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: messages.invalid_type_email,
      invalid_type_error: messages.invalid_type_email,
    })
    .email(messages.invalid_email),
  password: z
    .string({
      required_error: messages.invalid_type_password,
      invalid_type_error: messages.invalid_type_password,
    })
    .min(1, { message: messages.invalid_type_password }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;