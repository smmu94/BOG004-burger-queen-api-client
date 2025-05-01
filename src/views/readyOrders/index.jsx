import React, { useEffect } from "react";
import Navbar from "@/components/navBar";
import DeliveredOrders from "@/components/waiter/readyOrder/delivered";
import ServedOrders from "@/components/waiter/readyOrder/served";
import { useOrderStore } from "@/store/useOrderStore";
import { NAVBAR_ITEMS } from "@/views/order/constants.js";
import "./Readyorders.scss";

const Readyorders = () => {
  const { getOrders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="readyOrders-view" data-testid="readyorders-view">
      <Navbar items={NAVBAR_ITEMS} />
      <section className="readyOrders-container" data-testid="readyorders-container">
        <DeliveredOrders />
        <ServedOrders />
      </section>
    </section>
  );
};

export default Readyorders;
