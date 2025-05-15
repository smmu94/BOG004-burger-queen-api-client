import React from "react";
import Button from "@/components/button";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import { useOrderStore } from "@/store/useOrderStore";
import { getCurrentDate } from "@/utils/dateTime";
import { useState } from "react";
import { Alert } from "reactstrap";
import "./orderSummary.scss";
import ProductSummary from "./summary";
import { getTotalPrice } from "./utils";

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
    <form id="form" className="form-client" onSubmit={handleSubmit} data-testid="order-summary">
      <div className="client">
        <p className="nameClient">Customer Name</p>
        <input
          type="text"
          name="client"
          className="input-client"
          value={client}
          required
          onChange={(e) => setClient(e.target.value)}
          data-testid="input-client"
        />
      </div>
      <ProductSummary />
      <div className="final-summary" data-testid="final-summary">
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
