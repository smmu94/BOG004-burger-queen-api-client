import React from "react";
import { useOrderStore } from "@/store/useOrderStore";
import Order from "./order";
import styles from "./delivered.module.scss";

const Delivered = () => {
  const { orders } = useOrderStore();

  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <section className={styles.deliveredOrders} data-testid="deliveredOrders">
      {deliveredOrders.map((ord) => (
        <Order
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
