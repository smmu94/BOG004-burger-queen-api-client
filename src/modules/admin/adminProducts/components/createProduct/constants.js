export const formValidation = {
  productName: {
    required: "Product name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only letters and spaces allowed",
    },
  },
  productPrice: {
    required: "Product price is required",
    min: {
      value: 0.01,
      message: "Price must be greater than zero",
    },
  },
  imageUrl: {
    required: "Image URL is required",
    pattern: {
      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
      message: "Invalid image URL",
    },
  },
  type: {
    required: "Product type is required",
  },
};

export const productFields = [
  {
    name: "productName",
    label: "Product Name",
    rules: formValidation.productName,
  },
  {
    name: "productPrice",
    label: "Product Price",
    type: "number",
    rules: formValidation.productPrice,
  },
  {
    name: "imageUrl",
    label: "Image URL",
    type: "url",
    rules: formValidation.imageUrl,
  },
  {
    name: "type",
    label: "Product Type",
    type: "select",
    rules: formValidation.type,
    options: [
      { value: "", label: "Select Product Type", disabled: true },
      { value: "Desayuno", label: "Desayuno" },
      { value: "Almuerzo", label: "Almuerzo" },
    ],
  },
];

export const initialValues = {
  productName: "",
  productPrice: "",
  imageUrl: "",
  type: "",
};
