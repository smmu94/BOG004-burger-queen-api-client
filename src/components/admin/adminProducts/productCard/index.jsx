import React from "react";
import Button from "@/components/button";
import "@/components/waiter/order/order/product/product.scss";
import { useProductStore } from "@/store/useProductStore";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./productCard.scss";

const ProductCard = ({ product, handleDelete }) => {
  const { setProductToEdit } = useProductStore();
  return (
    <section className="product-card" data-testid="product-card">
      <div className="product">
        <div className="img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <p>{product.name}</p>
          <p>${product.price}</p>
          <p>{product.type}</p>
        </div>
      </div>
      <div className="product-actions">
        <Button onClick={() => setProductToEdit(product)}>
          <GrEdit />
        </Button>
        <Button onClick={handleDelete}>
          <RiDeleteBin6Line />
        </Button>
      </div>
    </section>
  );
};

export default ProductCard;
