import { z } from "zod";

const messages = {
  required_error_id: "O ID do produto é obrigatório.",
  invalid_type_id: "O ID do produto deve ser um número.",
  required_error_seller_id: "O ID do vendedor é obrigatório.",
  invalid_type_seller_id: "O ID do vendedor deve ser uma string.",
  required_error_phone_number: "O número de telefone deve ser uma string.",
  invalid_type_phone_number: "O número de telefone deve ser uma string.",
  invalid_type_banner_url: "A URL do banner deve ser uma string.",
  required_error_title: "O título do produto é obrigatório.",
  invalid_type_title: "O título deve ser uma string.",
  invalid_type_course_url: "A URL do curso deve ser uma string.",
  required_error_description: "A descrição do produto é obrigatória.",
  invalid_type_description: "A descrição deve ser uma string.",
  required_error_price: "O preço do produto é obrigatório.",
  invalid_type_price: "O preço deve ser um número.",
  required_error_workload: "A quantidade do produto é obrigatória.",
  invalid_type_workload: "A quantidade deve ser um número.",
};

export const updateCourseFormSchema = z.object({
  id: z.number({
    required_error: messages.required_error_id,
    invalid_type_error: messages.invalid_type_id,
  }),
  seller_id: z.number({
    required_error: messages.required_error_seller_id,
    invalid_type_error: messages.invalid_type_seller_id,
  }),
  phone_number: z.string({
    required_error: messages.required_error_phone_number,
    invalid_type_error: messages.invalid_type_phone_number,
  }),
  banner_url: z
    .string({
      invalid_type_error: messages.invalid_type_banner_url,
    })
    .url({ message: messages.invalid_type_banner_url }),
  title: z.string({
    required_error: messages.required_error_title,
    invalid_type_error: messages.invalid_type_title,
  }),
  course_url: z
    .string({
      invalid_type_error: messages.invalid_type_course_url,
    })
    .url({ message: messages.invalid_type_course_url }),
  description: z.string({
    required_error: messages.required_error_description,
    invalid_type_error: messages.invalid_type_description,
  }),
  price: z.number({
    required_error: messages.required_error_price,
    invalid_type_error: messages.invalid_type_price,
  }),
  workload: z.number({
    required_error: messages.required_error_workload,
    invalid_type_error: messages.invalid_type_workload,
  }),
});

export type UpdateCourseFormData = z.infer<typeof updateCourseFormSchema>;
