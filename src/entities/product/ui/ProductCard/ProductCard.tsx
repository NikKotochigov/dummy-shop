"use client";

import { Product } from "../../model/types";
import { useAuthStore } from "@/entities/user/model/authStore";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = () => {
    console.log("Add to cart:", product.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className={styles.discount}>
              -{product.discountPercentage}%
            </span>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={handleAddToCart}
            className={styles.addToCartButton}
            type="button"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
