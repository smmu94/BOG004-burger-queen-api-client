import { format } from "date-fns";

export const getCurrentDate = () => format(new Date(), "yyyy-MM-dd HH:mm");

export const getTotalPrice= (products) => products.reduce(
  (total, product) => total + product.price * product.quantity,
  0
);
