import "./css/Ordercontainer.scss";
import Order from "../components/waiter/order.jsx";
import Ordersummary from "../components/waiter/orderSummary";
import Navbar from "../components/navBar.jsx";
import { useState } from "react";
import { routes } from "../utils/constants.js";

const Ordercontainer = () => {
  const [summaryProducts, setSummaryProducts] = useState([]);
  const addProduct = (product) => {
    const newSummaryProducts = [...summaryProducts];
    if (summaryProducts.find((p) => p.id === product.id)) {
      newSummaryProducts.find((p) => p.id === product.id).quantity += 1;
    } else {
      newSummaryProducts.push({ ...product, quantity: 1 });
    }
    setSummaryProducts(newSummaryProducts);
  };
  const removeProduct = (id) => {
    const removeSummaryProducts = [...summaryProducts];
    removeSummaryProducts.find((p) => p.id === id).quantity -= 1;
    if (removeSummaryProducts.find((p) => p.id === id).quantity === 0) {
      removeSummaryProducts.splice(
        removeSummaryProducts.findIndex((p) => p.id === id),
        1
      );
    }
    setSummaryProducts(removeSummaryProducts);
  };

  const resetProduct = () => {
    setSummaryProducts([]);
  };

  return (
    <div className="order-view" data-testid="order-view">
      <Navbar
        item1="ÓRDENES"
        item2="PEDIDOS LISTOS"
        link1={routes.order}
        link2={routes.readyOrder}
      />
      <div className="order-container" data-testid="order-container">
        <Order handleAddProduct={addProduct} />
        <Ordersummary
          productList={summaryProducts}
          handleRemoveProduct={removeProduct}
          reset={resetProduct}
        />
      </div>
    </div>
  );
};

export default Ordercontainer;
