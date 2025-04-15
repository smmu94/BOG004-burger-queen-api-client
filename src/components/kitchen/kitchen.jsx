import "./kitchen.scss";
import { updateOrder } from "../../providers/OrderProducts.js";
import { useState, useMemo, useEffect } from "react";
import { Alert } from "reactstrap";

const Kitchen = (props) => {
  const [messageTime, setMessageTime] = useState("");
  const channel = useMemo(() => new BroadcastChannel("orders"), []);

  let dateNow = new Date();
  const upOrder = {
    status: "delivered",
    dateProcessed:
      dateNow.getFullYear() +
      "-" +
      (dateNow.getMonth() + 1) +
      "-" +
      dateNow.getDate() +
      " " +
      dateNow.getHours() +
      ":" +
      dateNow.getMinutes(),
  };
  const handleClick = () => {
    updateOrder(props.id, upOrder).then((res) => {
      let timeMs = Math.abs(
        new Date(res.data.dateProcessed).getTime() -
          new Date(res.data.dataEntry).getTime()
      );

      const timeOrder = (timeMs) => {
        let seconds = Math.floor((timeMs / 1000) % 60),
          minutes = Math.floor((timeMs / (1000 * 60)) % 60),
          hours = Math.floor((timeMs / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
      };
      updateOrder(props.id, { timeOrd: timeOrder(timeMs) });

      setTimeout(() => {
        props.resetKitchen(props.id);
        setMessageTime(null);
      }, 3000);

      if (timeOrder(timeMs) < "01:00:00") {
        return setMessageTime(
          `La preparación del pedido tomó ${timeOrder(timeMs)} minutos`
        );
      } else {
        return setMessageTime(
          `La preparación del pedido tomó ${timeOrder(timeMs)} horas`
        );
      }
    });

    channel.postMessage("updateOrders");
  };

  useEffect(() => {
    return () => channel.close();
  }, [channel]);

  return (
    <div className="container-order" data-testid='container-order'>
      <section>
        <p className="clientName">Cliente: {props.client}</p>
        <p className="orderNum">Ordén #{props.id}</p>
        <div className="description-order">
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
        {/* <div className="dataEntry">{props.dataEntry}</div> */}
        <button type="button" className="btn-order" onClick={handleClick}>
          ENVIAR
        </button>
        {messageTime && (
          <Alert data-testid="delivered-order" color="success">
            {messageTime}
          </Alert>
        )}
      </section>
    </div>
  );
};

export default Kitchen;
