import Navbar from "@/components/navBar";
import Order from "@/components/waiter/order/order";
import Ordersummary from "@/components/waiter/order/summary";
import "./Ordercontainer.scss";
import { NAVBAR_ITEMS } from "./constants";

const Ordercontainer = () => {
  return (
    <div className="order-view" data-testid="order-view">
      <Navbar items={NAVBAR_ITEMS} />
      <div className="order-container" data-testid="order-container">
        <Order />
        <Ordersummary />
      </div>
    </div>
  );
};

export default Ordercontainer;
