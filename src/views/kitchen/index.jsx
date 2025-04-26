import Kitchen from "@/components/kitchen";
import Navbar from "@/components/navBar";
import { useOrderStore } from "@/store/useOrderStore";
import React, { useEffect } from "react";
import "./Kitchencontainer.scss";

const Kitchencontainer = () => {
  const { orders, getOrders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "pending") return -1;
    return 1;
  });

  return (
    <div className="kitchen-view" data-testid="kitchen-view">
      <Navbar items={[]} />
      <div className="kitchen-container" data-testid="kitchen-container">
        {!sortedOrders.length && (
          <h2 className="no-orders" data-testid="no-orders">
            There are no orders at the moment. Please wait for new orders to appear.
          </h2>
        )}
        {sortedOrders.map((ord) => {
          return (
            <Kitchen
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
export default Kitchencontainer;
