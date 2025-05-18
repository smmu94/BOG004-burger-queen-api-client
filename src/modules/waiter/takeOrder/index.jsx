import React from 'react';
import Navbar from "@/components/navBar";
import ProductList from "./components/productList";
import OrderSummary from "./components/orderSummary";
import { NAVBAR_ITEMS } from "./constants";
import styles from "./takeOrder.module.scss";

const TakeOrder = () => {
  return (
    <section className={styles["order-view"]} data-testid="order-view">
      <Navbar items={NAVBAR_ITEMS} />
      <div className={styles["order-container"]} data-testid="order-container">
        <ProductList />
        <OrderSummary />
      </div>
    </section>
  );
};

export default TakeOrder;
