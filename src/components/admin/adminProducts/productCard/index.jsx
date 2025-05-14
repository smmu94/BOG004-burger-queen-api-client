import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./productCard.scss";
import "@/components/waiter/order/order/product/product.scss";

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
        <button className="btn-edit" onClick={() => setProductToEdit(product)}>
          <GrEdit data-testid="edit-product" />
        </button>
        <button className="btn-delete" onClick={handleDelete} data-testid="delete-product">
          <RiDeleteBin6Line />
        </button>
      </div>
    </section>
  );
};

export default ProductCard;
