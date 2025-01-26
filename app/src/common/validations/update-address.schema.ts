import { z } from "zod";

const messages = {
  required_error_name: "Nome do endereço é obrigatório",
  invalid_type_name: "Nome do endereço inválido",
  required_error_uf: "UF é obrigatório",
  invalid_type_uf: "UF inválida, deve ter exatamente 2 caracteres",
  required_error_city: "Cidade é obrigatória",
  invalid_type_city: "Cidade inválida",
  required_error_street: "Rua ou Avenida é obrigatória",
  invalid_type_street: "Rua ou Avenida inválida",
  required_error_neighborhood: "Bairro é obrigatório",
  invalid_type_neighborhood: "Bairro inválido",
  required_error_number: "Número é obrigatório",
  invalid_type_number: "Número inválido",
  required_error_complement: "Complemento é obrigatório",
  invalid_type_complement: "Complemento inválido",
  required_error_cep: "CEP é obrigatório",
  invalid_type_cep: "CEP inválido",
};

export const updateAddressFormSchema = z.object({
  name: z
    .string({
      required_error: messages.required_error_name,
      invalid_type_error: messages.invalid_type_name,
    })
    .optional()
    .nullable(),
  uf: z
    .string({
      required_error: messages.required_error_uf,
      invalid_type_error: messages.invalid_type_uf,
    })
    .length(2, { message: messages.invalid_type_uf })
    .optional()
    .nullable(),
  city: z
    .string({
      required_error: messages.required_error_city,
      invalid_type_error: messages.invalid_type_city,
    })
    .optional()
    .nullable(),
  street: z
    .string({
      required_error: messages.required_error_street,
      invalid_type_error: messages.invalid_type_street,
    })
    .optional()
    .nullable(),
  neighborhood: z
    .string({
      required_error: messages.required_error_neighborhood,
      invalid_type_error: messages.invalid_type_neighborhood,
    })
    .optional()
    .nullable(),
  number: z
    .string({
      required_error: messages.required_error_number,
      invalid_type_error: messages.invalid_type_number,
    })
    .optional()
    .nullable(),
  complement: z
    .string({
      required_error: messages.required_error_complement,
      invalid_type_error: messages.invalid_type_complement,
    })
    .optional()
    .nullable(),
  cep: z
    .string({
      required_error: messages.required_error_cep,
      invalid_type_error: messages.invalid_type_cep,
    })
    .min(8, { message: messages.invalid_type_cep })
    .optional()
    .nullable(),
});
