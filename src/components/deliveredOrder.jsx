import "./css/deliveredOrder.scss";


const DeliveredOrder = ({ client, timeOrd }) => {
  return (
    <div className="deliveredOrder">
      <p>{client}</p>
      <p>{timeOrd}</p>
    </div>
  );
};

export default DeliveredOrder;
