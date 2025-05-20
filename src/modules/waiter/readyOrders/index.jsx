import React, { useEffect } from "react";
import Navbar from "@/components/navBar";
import Delivered from "./components/delivered";
import Served from "./components/served";
import { useOrderStore } from "@/store/useOrderStore";
import { NAVBAR_ITEMS } from "@/modules/waiter/takeOrder/constants.js";
import styles from "./readyOrders.module.scss";

const ReadyOrders = () => {
  const { getOrders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className={styles["readyOrders-view"]} data-testid="readyorders-view">
      <Navbar items={NAVBAR_ITEMS} />
      <section className={styles["readyOrders-container"]} data-testid="readyorders-container">
        <Delivered />
        <Served />
      </section>
    </section>
  );
};

export default ReadyOrders;
