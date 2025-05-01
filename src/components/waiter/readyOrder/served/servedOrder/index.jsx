import React from "react";
import "./servedOrder.scss";

const ServedOrder = ({ client, timeOrd }) => {
  return (
    <tr className="servedOrder" data-testid="ServedOrder">
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
