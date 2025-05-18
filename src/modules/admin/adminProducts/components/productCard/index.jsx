import React from "react";
import Button from "@/components/button";
import Card from "@/components/card";
import { useProductStore } from "@/store/useProductStore";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductCard = ({ product, handleDelete }) => {
  const { setProductToEdit } = useProductStore();

  return (
    <Card
      image={product.image}
      info={{ name: product.name, price: `$${product.price}`, type: product.type }}
    >
      <Button onClick={() => setProductToEdit(product)}>
        <GrEdit />
      </Button>
      <Button onClick={handleDelete}>
        <RiDeleteBin6Line />
      </Button>
    </Card>
  );
};

export default ProductCard;
