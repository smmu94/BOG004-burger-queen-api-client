import CreateForm from "@/modules/admin/components/createForm";
import { useProductStore } from "@/store/useProductStore";
import { getCurrentDate } from "@/utils/dateTime";
import React, { useEffect, useMemo } from "react";
import { initialValues as initialProductValues, productFields } from "./constants";

const CreateProduct = () => {
  const { addProduct, updateProduct, productToEdit, setProductToEdit, status, clearStatus } =
    useProductStore();

  const initialFormValues = useMemo(
    () =>
      productToEdit
        ? {
            productName: productToEdit.name,
            productPrice: productToEdit.price,
            imageUrl: productToEdit.image,
            type: productToEdit.type,
          }
        : initialProductValues,
    [productToEdit]
  );

  const onSubmit = (data) => {
    const product = {
      ...data,
      price: parseFloat(data.productPrice),
      ...(productToEdit ? {} : { dataEntry: getCurrentDate() }),
    };

    productToEdit ? updateProduct(productToEdit.id, product) : addProduct(product);
    setProductToEdit(null);
  };

  const onCancel = () => {
    setProductToEdit(null);
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(clearStatus, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.message, clearStatus]);

  return (
    <CreateForm
      fields={productFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialFormValues}
      status={status}
      isEditing={!!productToEdit}
    />
  );
};

export default CreateProduct;
