import { ENDPOINTS } from "@/constants/endpoints";

import { api } from "@/services/api.service";
import { CreateProductFormData } from "../validations/create-form.schema";
import { UpdateProductFormData } from "../validations/update-form.schema";

type TypeFormCreate = CreateProductFormData;
type TypeFormUpdate = UpdateProductFormData;

export const createProductMutation = async (product: TypeFormCreate) => {
  const { data } = await api.post(ENDPOINTS.products, {
    ...product,
  });

  return data;
};

export const updateProductMutation = async (product: TypeFormUpdate) => {
  const { data } = await api.put(`${ENDPOINTS.products}/${product.id}`, {
    ...product,
  });

  return data;
};

export const deleteProductMutation = async (id: string) => {
  const { data } = await api.delete(`${ENDPOINTS.products}/${id}`);
  return data;
};