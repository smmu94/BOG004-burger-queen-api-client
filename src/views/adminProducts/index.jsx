import CreateProduct from "@/components/admin/adminProducts/createProduct";
import ProductCard from "@/components/admin/adminProducts/productCard";
import DeleteModal from "@/components/admin/deleteModal";
import Navbar from "@/components/navBar";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Adminproducts.scss";
import { NAVBAR_ITEMS } from "./constants";

const AdminproductsView = () => {
  const { products, getProducts, deleteProduct } = useProductStore();
  const [openModal, setOpenModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (product) => {
    setProductToDelete(product);
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setProductToDelete(null);
  };

  const handleConfirm = () => {
    deleteProduct(productToDelete.id);
    setOpenModal(false);
    setProductToDelete(null);
  };

  return (
    <section className="admin-products-view" data-testid="admin-products-view">
      <Navbar items={NAVBAR_ITEMS} />
      <div className="admin-products-container" data-testid="admin-products-container">
        <CreateProduct />
        <div className="products-inventory" data-testid="products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={() => handleDelete(product)}
            />
          ))}
        </div>
      </div>
      {openModal &&
        createPortal(
          <DeleteModal onCancel={handleCancel} onConfirm={handleConfirm} />,
          document.body
        )}
    </section>
  );
};

export default AdminproductsView;
