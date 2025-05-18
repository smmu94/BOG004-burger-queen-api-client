import React, { useEffect } from "react";
import Order from "./components/order";
import Navbar from "@/components/navBar";
import { useOrderStore } from "@/store/useOrderStore";
import { emptyOrdersMessage } from "./constants";
import styles from "./kitchen.module.scss";

const Kitchen = () => {
  const { orders, getOrders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, []);

  const pendingAndDeliveredOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "delivered"
  );

  const sortedOrders = [...pendingAndDeliveredOrders].sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "pending") return -1;
    return 1;
  });

  return (
    <div className={styles["kitchen-view" ]} data-testid="kitchen-view">
      <Navbar items={[]} />
      <div className={styles["kitchen-container"]} data-testid="kitchen-container">
        {!sortedOrders.length && (
          <h2 className={styles["no-orders"]} data-testid="no-orders">
            {emptyOrdersMessage}
          </h2>
        )}
        {sortedOrders.map((ord) => {
          return (
            <Order
              key={"order-" + ord.id}
              id={ord.id}
              client={ord.client}
              product={ord.products}
              status={ord.status}
              dataEntry={ord.dataEntry}
              timeOrd={ord.timeOrd}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Kitchen;
