import React from "react";
import Button from "@/components/button";
import { useProductStore } from "@/store/useProductStore";
import { getCurrentDate } from "@/utils/dateTime";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";
import { formValidation } from "./constants";
import "./createProduct.scss";

const CreateProduct = () => {
  const { addProduct, updateProduct, productToEdit, setProductToEdit, status, clearStatus } =
    useProductStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
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
        <div className="input">
          <input
            {...register("productName", formValidation.productName)}
            placeholder="Product Name"
            className={errors.productName ? "input-error" : ""}
            data-testid="product-name"
          />
          <span className="error">{errors.productName?.message || "\u00A0"}</span>
        </div>
        <div className="input">
          <input
            type="number"
            {...register("productPrice", formValidation.productPrice)}
            placeholder="Product Price"
            className={errors.productPrice ? "input-error" : ""}
            data-testid="product-price"
          />
          <span className="error">{errors.productPrice?.message || "\u00A0"}</span>
        </div>
        <div className="input">
          <input
            type="url"
            {...register("imageUrl", formValidation.imageUrl)}
            placeholder="Image URL"
            className={errors.imageUrl ? "input-error" : ""}
            data-testid="product-image"
          />
          <span className="error">{errors.imageUrl?.message || "\u00A0"}</span>
        </div>
        <div className="input">
          <select
            {...register("type", formValidation.type)}
            className={`${errors.type ? "input-error" : ""} ${
              watch("type") === "" ? "defaultValue" : ""
            }`}
            data-testid="product-type"
          >
            <option value="" disabled hidden>
              Select Product Type
            </option>
            <option className="options" value="Desayuno">
              Desayuno
            </option>
            <option value="Almuerzo">Almuerzo</option>
          </select>
          <span className="error">{errors.type?.message || "\u00A0"}</span>
        </div>
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
