import "./servedOrder.scss";


const ServedOrder = ({ client, timeOrd }) => {
  return (
    <tr className="deliveredOrder" data-testid="deliveredOrder">
      <td> <p>{client}</p></td>
      <td><p>{timeOrd}</p></td>
    </tr>
  );
};

export default ServedOrder;
