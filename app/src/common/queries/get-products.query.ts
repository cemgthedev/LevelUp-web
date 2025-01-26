import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/services/api.service";

import { TProduct } from "@/types/TProduct";

export interface ProductsResponse {
  products: TProduct[];
}

export interface IFilterProducts {
  seller_id?: string;
  subject?: string;
  min_price?: number;
  max_price?: number;
  category?: string;
  min_quantity?: number;
  max_quantity?: number;
}

export const getProductsQuery = async (id: string) => {
  const { data } = await api.get(`${ENDPOINTS.products}/${id}`);
  return data;
};

export const searchProductQuery = async (
  filterProps?: IFilterProducts,
) => {
  const { data } = await api.get<ProductsResponse>(ENDPOINTS.products, {
    params: {
      ...filterProps,
    },
  });

  return data;
};

export const queryKeysProduct = {
  get_list_products: "get_list_products",
  get_product: "get_product",
};