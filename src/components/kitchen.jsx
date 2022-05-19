import "./css/kitchen.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Kitchen = (props) => {
  return (
    <section>
      <p className="nameClient">CLIENTE: {props.client}</p>

      <div>
        {props.product.map((product) => {
          return (
            <section>
              <div>{product.quantity}</div>
              <div>{product.name}</div>
            </section>
          );
        })}
      </div>

      <button type="submit" className="btn-client">
        ENVIAR
      </button>
    </section>
  );
};

export default Kitchen;
