import { useState, useEffect } from "react";
import { productApi } from "@/entities/product/api/productApi";
import { Product } from "@/entities/product/model/types";
import { ApiError } from "@/shared/types";

interface UseProductListResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useProductList = (limit: number = 12): UseProductListResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productApi.getProducts(limit, 0);
        setProducts(response.products);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return { products, isLoading, error };
};
