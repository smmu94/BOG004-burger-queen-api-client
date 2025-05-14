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
  }
};
