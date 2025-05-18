import React from "react";
import styles from "./orderRow.module.scss";

const ServedOrder = ({ client, timeOrd }) => {
  return (
    <tr className={styles.orderRow} data-testid="orderRow">
      <td>
        <p>{client}</p>
      </td>
      <td>
        <p>{timeOrd}</p>
      </td>
    </tr>
  );
};

export default ServedOrder;
