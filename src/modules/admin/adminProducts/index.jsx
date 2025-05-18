import React, { useEffect, useState } from "react";
import CreateProduct from "./components/createProduct";
import ProductCard from "./components/productCard";
import DeleteModal from "@/modules/admin/components/deleteModal";
import Navbar from "@/components/navBar";
import { useProductStore } from "@/store/useProductStore";
import { createPortal } from "react-dom";
import styles from "./adminProducts.module.scss";
import { NAVBAR_ITEMS } from "@/modules/admin/constants"

const AdminProducts = () => {
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
    <section className={styles["admin-products-view"]} data-testid="admin-products-view">
      <Navbar items={NAVBAR_ITEMS} />
      <div className={styles["admin-products-container"]} data-testid="admin-products-container">
        <CreateProduct />
        <div className={styles["products-inventory"]} data-testid="products">
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

export default AdminProducts;
