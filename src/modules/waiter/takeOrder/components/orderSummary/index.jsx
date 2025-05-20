import React, {useEffect} from "react";
import Button from "@/components/button";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import { useOrderStore } from "@/store/useOrderStore";
import { getCurrentDate } from "@/utils/dateTime";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import ProductSummary from "./components/product";
import { getTotalPrice } from "./utils";
import styles from "./orderSummary.module.scss";
import { noop } from "underscore";

const OrderSummary = () => {
  const { products, resetProduct } = useCurrentOrderStore();
  const { createOrder, message, error } = useOrderStore();
  const [client, setClient] = useState("");
  const [showProductMessage, setShowProductMessage] = useState(false);

  useEffect(() => {
    setShowProductMessage(!products.length);
  }, [products.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!products.length) {
      return;
    }

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
      {showProductMessage && (
        <Alert variant="warning" data-testid="product-message">
          Please add at least one product to the order.
        </Alert>
      )}
      <div className={styles["final-summary"]} data-testid="final-summary">
        <div>Total: ${totalPrice}</div>
        <Alert
          variant={error ? "danger" : "success"}
          show={!!(message || error)}
          data-testid={`alert-${error ? "error" : "message"}`}
        >
          {message || error}
        </Alert>
        <Button type="submit" size="medium" onClick={noop}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default OrderSummary;
