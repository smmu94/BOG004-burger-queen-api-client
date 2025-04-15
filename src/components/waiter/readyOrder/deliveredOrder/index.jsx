import "./deliveredOrder.scss";


const DeliveredOrder = ({ client, timeOrd }) => {
  return (
    <tr className="deliveredOrder" data-testid="deliveredOrder">
      <td> <p>{client}</p></td>
      <td><p>{timeOrd}</p></td>
    </tr>
  );
};

export default DeliveredOrder;
