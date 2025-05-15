import React from "react";
import Button from "@/components/button";
import { useOrderStore } from "@/store/useOrderStore";
import { calculatePreparationTime } from "@/utils/dateTime";
import { useEffect, useState } from "react";
import { Alert, Badge } from "reactstrap";
import "./kitchen.scss";

const Kitchen = ({ id, client, product, status, dataEntry, timeOrd }) => {
  const [prepTimeMsg, setPrepTimeMsg] = useState("");
  const { updateOrder } = useOrderStore();

  const handleClick = async () => {
    const { formattedTime, dateProcessed: newDateProcessed } = calculatePreparationTime(dataEntry);

    await updateOrder(id, {
      status: "delivered",
      dateProcessed: newDateProcessed,
      timeOrd: formattedTime,
    });
  };

  useEffect(() => {
    if (status === "delivered") {
      setPrepTimeMsg(`The order preparation took ${timeOrd}`);
    }
  }, [status, timeOrd]);

  return (
    <section className="kitchen-order" data-testid="container-order">
      <div className="kitchen-header">
        <Badge
          color={status === "pending" ? "warning" : "success"}
          className="status"
          pill
          data-testid="status"
        >
          {status}
        </Badge>
        <p className="orderNum">Order #{id}</p>
      </div>
      <p className="clientName">Customer: {client}</p>
      <div className="description-order">
        {product.map((prod) => (
          <section className="amount-product" key={`order-product-${prod.id}`}>
            <div className="amount">{prod.quantity}</div>
            <div className="product-name">{prod.name}</div>
          </section>
        ))}
      </div>
      {prepTimeMsg && (
        <Alert data-testid="delivered-order" color="success">
          {prepTimeMsg}
        </Alert>
      )}
      {!prepTimeMsg && (
        <Button onClick={handleClick}>
          Send
        </Button>
      )}
    </section>
  );
};

export default Kitchen;
