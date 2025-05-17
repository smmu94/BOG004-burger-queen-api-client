import React from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useProductStore } from "@/store/useProductStore";
import { getCurrentDate } from "@/utils/dateTime";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "reactstrap";
import { formValidation } from "./constants";
import "./createProduct.scss";

const CreateProduct = () => {
  const { addProduct, updateProduct, productToEdit, setProductToEdit, status, clearStatus } =
    useProductStore();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const product = {
      name: data.productName,
      price: parseFloat(data.productPrice),
      image: data.imageUrl,
      type: data.type,
      ...(productToEdit ? {} : { dataEntry: getCurrentDate() }),
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, product);
    } else {
      addProduct(product);
    }

    reset();
    setProductToEdit(null);
  };

  const handleCancel = () => {
    setProductToEdit(null);
  };

  useEffect(() => {
    if (productToEdit) {
      reset({
        productName: productToEdit.name,
        productPrice: productToEdit.price,
        imageUrl: productToEdit.image,
        type: productToEdit.type,
      });
    } else {
      reset({
        productName: "",
        productPrice: "",
        imageUrl: "",
        type: "",
      });
    }
  }, [productToEdit, reset]);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        clearStatus();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const errorAdding = status.action === "add" && status.type === "error";
  const errorUpdating = status.action === "update" && status.type === "error";
  const successAdding = status.action === "add" && status.type === "success";
  const successUpdating = status.action === "update" && status.type === "success";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-product" data-testid="create-product">
      <div className="inputs">
        <Controller
          name="productName"
          control={control}
          rules={formValidation.productName}
          render={({ field }) => (
            <Input
              id="productName"
              label="Product Name"
              placeholder="Product Name"
              field={field}
              error={!!errors.productName}
              message={errors.productName?.message}
              data-testid="product-name"
            />
          )}
        />
        <Controller
          name="productPrice"
          control={control}
          rules={formValidation.productPrice}
          render={({ field }) => (
            <Input
              id="productPrice"
              type="number"
              label="Product Price"
              placeholder="Product Price"
              field={field}
              error={!!errors.productPrice}
              message={errors.productPrice?.message}
              data-testid="product-price"
            />
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          rules={formValidation.imageUrl}
          render={({ field }) => (
            <Input
              id="imageUrl"
              type="url"
              label="Image URL"
              placeholder="Image URL"
              field={field}
              error={!!errors.imageUrl}
              message={errors.imageUrl?.message}
              data-testid="product-image"
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          rules={formValidation.type}
          render={({ field }) => (
            <Input
              id="type"
              type="select"
              field={field}
              label="Product Type"
              error={!!errors.type}
              message={errors.type?.message}
              data-testid="product-type"
              options={[
                { value: "", label: "Select Product Type", disabled: true },
                { value: "Desayuno", label: "Desayuno" },
                { value: "Almuerzo", label: "Almuerzo" },
              ]}
            />
          )}
        />
      </div>
      <div className="alerts">
        {(errorAdding || errorUpdating) && (
          <Alert color="danger" data-testid="error-message">
            {status.message}
          </Alert>
        )}
        {(successAdding || successUpdating) && (
          <Alert color="success" data-testid="success-message">
            {status.message}
          </Alert>
        )}
      </div>
      <div className={`actions ${productToEdit ? "with-cancel" : ""}`}>
        <Button type="submit" data-testid="submit-button">
          {productToEdit ? "Update" : "Add"}
        </Button>
        {productToEdit && (
          <Button type="button" data-testid="cancel-button" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateProduct;
