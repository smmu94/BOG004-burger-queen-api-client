import React from "react";
import Button from "@/components/button";
import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { FOODTYPE } from "./constants";
import Product from "./components/product";
import styles from "./productList.module.scss";

export default function ProductList() {
  const { products, getProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [foodType, setFoodType] = useState(FOODTYPE.breakFast);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter((p) => p.type === foodType));
  }, [foodType, products]);

  return (
    <section className={styles["order"]} data-testid="order-products">
      <div className={styles["type-order"]}>
        {Object.values(FOODTYPE).map((type) => (
          <Button
            key={type}
            variant={foodType === type ? "primary" : "secondary"}
            onClick={() => setFoodType(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <div data-testid="products" className={styles["products"]}>
        {filteredProducts.map((producto) => {
          return (
            <Product
              key={producto.id}
              id={producto.id}
              name={producto.name}
              price={producto.price}
              image={producto.image}
              type={producto.type}
            />
          );
        })}
      </div>
    </section>
  );
}
