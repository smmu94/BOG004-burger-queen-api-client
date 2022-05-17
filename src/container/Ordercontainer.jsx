import "./css/Ordercontainer.scss";
import Order from "../components/order.jsx";
import Ordersummary from "../components/orderSummary";
import Navbar from "../components/navBar.jsx";

function Ordercontainer() {
  return (
    <div className="order-container">
      <Navbar item1="ÓRDENES" item2="PEDIDOS LISTOS" />
      <div className="order-summary">
        <Order />
        <Ordersummary />
      </div>
    </div>
  );
}

export default Ordercontainer;
