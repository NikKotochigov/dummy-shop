"use client";

import { ProductCard } from "@/entities/product/ui/ProductCard";
import { useProductList } from "../../lib/hooks/useProductList";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const { products, isLoading, error } = useProductList(12);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No products found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
