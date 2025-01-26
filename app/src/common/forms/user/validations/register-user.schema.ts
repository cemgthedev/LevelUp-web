import { z } from "zod";
import { createAddressFormSchema } from "../../../validations/create-address.schema";

const messages = {
  required_error_name: "O nome do usuário é obrigatório.",
  invalid_type_name: "O nome deve ser uma string.",
  required_error_age: "A idade é obrigatória.",
  invalid_type_age: "A idade deve ser um número.",
  required_error_cpf: "O CPF é obrigatório.",
  invalid_type_cpf: "O CPF deve conter pelo menos 11 caracteres.",
  required_error_gender: "O gênero é obrigatório.",
  invalid_type_gender: "O gênero deve ser uma string.",
  required_error_phone_number: "O número de telefone é obrigatório.",
  invalid_type_phone_number: "O número de telefone deve ser uma string.",
  required_error_address: "O endereço é obrigatório.",
  invalid_type_address: "O endereço deve ser uma string.",
  required_error_email: "E-mail do usuário é obrigatório.",
  invalid_type_email: "E-mail do usuário inválido.",
  required_error_password: "Senha é obrigatória",
  invalid_type_password: "Senha inválida",
  required_error_password_confirmation: "Senha de confirmação é obrigatória",
  invalid_type_password_confirmation: "Senha de confirmação inválida",
};

export const createUserFormSchema = z
  .object({
    name: z.string({
      required_error: messages.required_error_name,
      invalid_type_error: messages.invalid_type_name,
    }),
    age: z
      .number({
        invalid_type_error: messages.invalid_type_age,
      })
      .optional(),
    cpf: z
      .string({
        required_error: messages.required_error_cpf,
        invalid_type_error: messages.invalid_type_cpf,
      })
      .min(11, { message: messages.invalid_type_cpf }),
    gender: z
      .string({
        invalid_type_error: messages.invalid_type_gender,
      })
      .optional(),
    phone_number: z.string({
      invalid_type_error: messages.invalid_type_phone_number,
    }),
    address: createAddressFormSchema.optional(),
    email: z
      .string({
        required_error: messages.required_error_email,
        invalid_type_error: messages.invalid_type_email,
      })
      .email({ message: messages.invalid_type_email }),
    password: z
      .string({
        required_error: messages.required_error_password,
        invalid_type_error: messages.invalid_type_password,
      })
      .min(6, { message: messages.invalid_type_password }),
    passwordConfirmation: z
      .string({
        required_error: messages.required_error_password_confirmation,
        invalid_type_error: messages.invalid_type_password_confirmation,
      })
      .min(6, { message: messages.invalid_type_password }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais",
        path: ["passwordConfirmation"],
      });
    }
  });

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
