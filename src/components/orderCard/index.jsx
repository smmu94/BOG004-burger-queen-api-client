import React from "react";
import { Badge } from "reactstrap";
import styles from "./orderCard.module.scss";

const OrderCard = ({ id, client, product, badgeColor, badgeText, children }) => {
  return (
    <section className={styles["order-card"]} data-testid="order-card">
      <div className={styles["order-header"]}>
        <Badge color={badgeColor} className={styles.status} pill data-testid="status">
          {badgeText}
        </Badge>
        <p className={styles.orderNum}>Order #{id}</p>
      </div>
      <p className={styles.clientName}>Customer: {client}</p>
      <div className={styles["description-order"]}>
        {product.map((prod) => (
          <section className={styles["amount-product"]} key={`order-product-${prod.id}`}>
            <div className={styles.amount}>{prod.quantity}</div>
            <div className={styles["product-name"]}>{prod.name}</div>
          </section>
        ))}
      </div>
      {children}
    </section>
  );
};

export default OrderCard;