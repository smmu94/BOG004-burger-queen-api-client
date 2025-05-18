import React from "react";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import Table from "react-bootstrap/Table";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { placeholderProduct } from "./constants";
import styles from "./product.module.scss"

const Product = () => {
  const { products, removeProduct } = useCurrentOrderStore();
  const isEmpty = products.length === 0;

  const displayedProducts = isEmpty ? [placeholderProduct] : products;
  const handleRemove = (id) => {
    if (!isEmpty) removeProduct(id);
  };

  return (
    <div className={styles["product-summary-wrapper"]} data-testid="product-summary">
      <Table className={styles["summary-table"]}>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody data-testid="quantity-product">
          {displayedProducts.map(({ id, quantity, name, price }) => (
            <tr className={styles["product-summary"]} key={"sum" + id}>
              <td>
                <div className={styles.quantity}>{quantity}</div>
              </td>
              <td className={styles.name}>{name}</td>
              <td>${price}</td>
              <td>
                <AiOutlineMinusCircle
                  data-testid="subtract"
                  className={`${styles.subtract} ${isEmpty ? styles.disabled : ""}`}
                  onClick={() => handleRemove(id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Product;
