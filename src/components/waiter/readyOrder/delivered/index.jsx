import { useOrderStore } from "@/store/useOrderStore";
import React from "react";
import "./delivered.scss";
import DeliveredOrder from "./deliveredOrder";

const Delivered = () => {
  const { orders } = useOrderStore();

  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <section className="deliveredOrders">
      {deliveredOrders.map((ord) => (
        <DeliveredOrder
          key={"dvOrder" + ord.id}
          id={ord.id}
          client={ord.client}
          product={ord.products}
        />
      ))}
    </section>
  );
};

export default Delivered;
