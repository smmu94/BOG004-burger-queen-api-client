import React from "react";
import Button from "@/components/button";
import { useOrderStore } from "@/store/useOrderStore";
import { calculatePreparationTime } from "@/utils/dateTime";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import OrderCard from "@/components/orderCard";

const Order = ({ id, client, product, status, dataEntry, timeOrd }) => {
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
    if (status === "delivered" && timeOrd) {
      setPrepTimeMsg(`The order preparation took ${timeOrd}`);
    }
  }, [status, timeOrd]);

  const badgeColor = status === "pending" ? "warning" : "success";
  const badgeText = status;

  return (
    <OrderCard
      id={id}
      client={client}
      product={product}
      status={status}
      badgeColor={badgeColor}
      badgeText={badgeText}
    >
      {prepTimeMsg && (
        <Alert data-testid="delivered-order" variant="success">
          {prepTimeMsg}
        </Alert>
      )}
      {!prepTimeMsg && status === "pending" && (
        <Button onClick={handleClick}>Send</Button>
      )}
    </OrderCard>
  );
};

export default Order;