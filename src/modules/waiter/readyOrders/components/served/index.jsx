import React from "react";
import Button from "@/components/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useState } from "react";
import { Table } from "react-bootstrap";
import OrderRow from "./components/orderRow";
import styles from "./served.module.scss";

const Served = () => {
  const [expanded, setExpanded] = useState(false);
  const { orders } = useOrderStore();
  const servedOrders = orders.filter((o) => o.status === "served");

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile && (
        <section className={styles.servedOrders}>
          <div
            className={styles["servedOrders-header"]}
            onClick={() => setExpanded(true)}
            data-testid="servedOrders-header"
          >
            <span>Order History</span>
            <span className={styles["toggle-icon"]}>▼</span>
          </div>
        </section>
      )}
      {(expanded || !isMobile) && (
        <div className={styles["servedOrders-overlay"]} data-testid="servedOrders">
          <div className={styles["servedOrders-overlay-header"]}>
            <span>Order History</span>
            <Button onClick={() => setExpanded(false)} variant="transparent" size="medium" className={styles["close-button"]}>
              ✕
            </Button>
          </div>
          <div className={styles["servedOrders-overlay-table"]}>
            <Table>
              <thead>
                <tr className={styles["subtitles-served"]}>
                  <th>Customer</th>
                  <th>Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {servedOrders.map((ord) => (
                  <OrderRow key={"svOrder" + ord.id} client={ord.client} timeOrd={ord.timeOrd} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Served;
