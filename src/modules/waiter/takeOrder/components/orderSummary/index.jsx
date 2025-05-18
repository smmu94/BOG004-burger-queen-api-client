import React from "react";
import Button from "@/components/button";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import { useOrderStore } from "@/store/useOrderStore";
import { getCurrentDate } from "@/utils/dateTime";
import { useState } from "react";
import { Alert } from "reactstrap";
import ProductSummary from "./components/product";
import { getTotalPrice } from "./utils";
import styles from "./orderSummary.module.scss";

const OrderSummary = () => {
  const { products, resetProduct } = useCurrentOrderStore();
  const { createOrder, message, error } = useOrderStore();
  const [client, setClient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      client,
      products,
      status: "pending",
      dataEntry: getCurrentDate(),
    };

    createOrder(order);
    setClient("");
    resetProduct();
  };

  const totalPrice = getTotalPrice(products);

  return (
    <form id="form" className={styles["form-client"]} onSubmit={handleSubmit} data-testid="order-summary">
      <div className={styles.client}>
        <p className={styles.nameClient}>Customer Name</p>
        <input
          type="text"
          name="client"
          className={styles["input-client"]}
          value={client}
          required
          onChange={(e) => setClient(e.target.value)}
          data-testid="input-client"
        />
      </div>
      <ProductSummary />
      <div className={styles["final-summary"]} data-testid="final-summary">
        <div>Total: ${totalPrice}</div>
        <Alert
          color={error ? "danger" : "success"}
          isOpen={!!(message || error)}
          data-testid={`alert-${error ? "error" : "message"}`}
        >
          {message || error}
        </Alert>
        <Button type="submit" size="medium">
          Send
        </Button>
      </div>
    </form>
  );
};

export default OrderSummary;
