import React from "react";
import Button from "@/components/button";
import { useOrderStore } from "@/store/useOrderStore";
import OrderCard from "@/components/orderCard";

const DeliveredOrder = ({ id, client, product }) => {
  const { updateOrder } = useOrderStore();
  const handleClick = () => {
    updateOrder(id, { status: "served" });
  };

  return (
    <OrderCard
      id={id}
      client={client}
      product={product}
      badgeColor="success"
      badgeText="delivered"
    >
      <Button onClick={handleClick}>Serve Order</Button>
    </OrderCard>
  );
};

export default DeliveredOrder;