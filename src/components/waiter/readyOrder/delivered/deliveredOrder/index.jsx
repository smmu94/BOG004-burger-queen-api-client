import React from "react";
import { Badge } from "reactstrap";
import { useOrderStore } from "@/store/useOrderStore";
import "./deliveredOrder.scss";
import Button from "@/components/button";

const DeliveredOrder = ({ id, client, product }) => {
  const { updateOrder } = useOrderStore();
  const handleClick = () => {
    updateOrder(id, { status: "served" });
  };

  return (
    <section className="delivered-order" data-testid="delivered-order">
      <div className="delivered-header">
        <Badge
          color="success"
          className="status"
          pill
          data-testid="status"
        >
          delivered
        </Badge>
        <p className="orderNum">Order #{id}</p>
      </div>
      <p className="clientName">Customer: {client}</p>
      <div className="description-order">
        {product.map((product) => {
          return (
            <section className="amount-product" key={"order-product-" + product.id} data-testid="order-product">
              <div className="amount">{product.quantity}</div>
              <div className="product-name">{product.name}</div>
            </section>
          );
        })}
      </div>
      <Button onClick={handleClick}>Serve Order</Button>
    </section>
  );
};

export default DeliveredOrder;
