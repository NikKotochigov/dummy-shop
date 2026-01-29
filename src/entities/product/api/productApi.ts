import apiClient from "@/shared/lib/api/client";
import { ProductListResponse } from "../model/types";

export const productApi = {
  getProducts: async (
    limit: number = 12,
    skip: number = 0
  ): Promise<ProductListResponse> => {
    const response = await apiClient.get<ProductListResponse>(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },
};
