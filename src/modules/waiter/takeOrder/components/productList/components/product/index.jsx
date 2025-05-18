import React from "react";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import Card from "@/components/card";

const Product = ({ name, price, id, type, image }) => {
  const { addProduct } = useCurrentOrderStore();
  const handleClick = () => {
    addProduct({ name, price, id, type });
  };

  return (
    <Card
      image={image}
      info={{ name, price: `$${price}`, type: type }}
      onClick={handleClick}
    />
  );
};

export default Product;