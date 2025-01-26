import { z } from "zod";

const messages = {
  required_error_id: "O ID do produto é obrigatório.",
  invalid_type_id: "O ID deve ser uma string.",
  required_error_seller_id: "O ID do vendedor é obrigatório.",
  invalid_type_seller_id: "O ID do vendedor deve ser uma string.",
  required_error_title: "O título do produto é obrigatório.",
  invalid_type_title: "O título deve ser uma string.",
  required_error_description: "A descrição do produto é obrigatória.",
  invalid_type_description: "A descrição deve ser uma string.",
  required_error_category: "A categoria do produto é obrigatória.",
  invalid_type_category: "A categoria deve ser uma string.",
  required_error_price: "O preço do produto é obrigatório.",
  invalid_type_price: "O preço deve ser um número.",
  required_error_quantity: "A quantidade do produto é obrigatória.",
  invalid_type_quantity: "A quantidade deve ser um número.",
  invalid_type_image_url: "A URL da imagem deve ser uma string.",
};

export const updateProductFormSchema = z.object({
  id: z
    .string({
      required_error: messages.required_error_id,
      invalid_type_error: messages.invalid_type_id,
    }),
  seller_id: z
    .string({
      required_error: messages.required_error_seller_id,
      invalid_type_error: messages.invalid_type_seller_id,
    }),
  title: z
    .string({
      required_error: messages.required_error_title,
      invalid_type_error: messages.invalid_type_title,
    }),
  description: z
    .string({
      required_error: messages.required_error_description,
      invalid_type_error: messages.invalid_type_description,
    }),
  category: z
    .string({
      required_error: messages.required_error_category,
      invalid_type_error: messages.invalid_type_category,
    }),
  price: z
    .number({
      required_error: messages.required_error_price,
      invalid_type_error: messages.invalid_type_price,
    }),
  quantity: z
    .number({
      required_error: messages.required_error_quantity,
      invalid_type_error: messages.invalid_type_quantity,
    }),
  image_url: z
    .string({
      invalid_type_error: messages.invalid_type_image_url,
    })
    .url({ message: messages.invalid_type_image_url })
    .optional()
    .nullable(),
});

export type UpdateProductFormData = z.infer<typeof updateProductFormSchema>;