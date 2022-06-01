import "./css/readyOrder.scss";
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import Timekeeper from "./Timekeeper.jsx";
import { getId } from "./providers/UserProvider.js";

const ReadyOrder = (props) => {
  const handleClick = () => {
    props.addDeliveredOrder({ client: props.client, timeOrd: props.timeOrd, id: props.id });
    props.resetReadyOrder(props.id);

    
  };

  return (
    <div className="container-ready">
      <section className="container-order">
        <p className="clientName">Cliente: {props.client}</p>
        <div>
          {props.product.map((product) => {
            return (
              <section
                className="amount-product"
                key={"order-product-" + product.id}
              >
                <div className="amount">{product.quantity}</div>
                <div className="product-name">{product.name}</div>
              </section>
            );
          })}
        </div>
        <div className="dataEntry">{props.dateProcessed}</div>
        <button type="button" className="btn-order" onClick={handleClick}>
          ENTREGAR ORDEN
        </button>
      </section>
    </div>
  );
};

export default ReadyOrder;
