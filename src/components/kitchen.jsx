import "./css/kitchen.scss";
// import { AiOutlineMinusCircle } from "react-icons/ai";
import Timekeeper from "./Timekeeper.jsx";

const Kitchen = (props) => {
  return (
    <div className="container-Kitchen">
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
          <Timekeeper />
        </div>

        <button type="submit" className="btn-order">
          ENVIAR
        </button>
      </section>
    </div>
  );
};

export default Kitchen;
