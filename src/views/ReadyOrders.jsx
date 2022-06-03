import "./css/Readyorders.scss";
import Navbar from "../components/navBar.jsx";
import { useEffect, useState } from "react";
import {
  getOrder,
  updateOrder,
} from "../providers/OrderProducts.js";
import ReadyOrder from "../components/waiter/readyOrder/readyOrder";
import DeliveredOrder from "../components/waiter/readyOrder/deliveredOrder";
// import Table from 'react-bootstrap/Table'

const Readyorders = () => {
  const [rdOrder, setRdOrder] = useState([]); //array de objetos
  const [deliveredOrder, setDeliveredOrder] = useState([]); //array de objetos

  const addDeliveredOrder = (dlOrd) => {
    const newDeliveredOrder = [...deliveredOrder]; //copia el array
    newDeliveredOrder.push(dlOrd); // si no está en el array, lo agrega
    updateOrder(dlOrd.id, { status: "served" }).then(() => fetchOrders());
    setDeliveredOrder(newDeliveredOrder); // actualiza el estado
  };

  const fetchOrders = () => {
    getOrder() // llamamos a la función products() que está en el provider
      .then((response) => {
        // cuando la función products() se ejecuta, se ejecuta la función then()
        console.log(response.data);
        setRdOrder(response.data); // guardamos los datos en el estado
      })
      .catch(() => {});
  };

  useEffect(() => {
    // useEffect es una función que se ejecuta cuando el componente se monta
    fetchOrders();
  }, []);

  const resetReadyOrder = (id) => {
    const resetDeliveredOrder = [...rdOrder]; //copia el array}

    if (resetDeliveredOrder.find((p) => p.id === id)) {
      resetDeliveredOrder.splice(
        resetDeliveredOrder.findIndex((p) => p.id === id),
        1
      );
    }

    setRdOrder(resetDeliveredOrder); // actualiza el estado
  };
  console.log(deliveredOrder);
  return (
    <section>
      <Navbar
        item1="ÓRDENES"
        item2="PEDIDOS LISTOS"
        link1="/order"
        link2="/readyorder"
      />
      <section className="containerReady">
        <section className="readyOrders">
          {rdOrder
            .filter((o) => o.status === "delivered")
            .map((ord) => {
              return (
                <ReadyOrder
                  key={"rdOrder" + ord.id}
                  id={ord.id}
                  client={ord.client}
                  product={ord.products}
                  dateProcessed={ord.dateProcessed}
                  addDeliveredOrder={addDeliveredOrder}
                  timeOrd={ord.timeOrd}
                  resetReadyOrder={resetReadyOrder}
                />
              );
            })}
        </section>

        <section className="deliveredOrders">
          <h1>HISTORIAL DE PEDIDOS</h1>
          <div className="subtitles-delivered">
            <p>Cliente</p>
            <p>Tiempo de entrega</p>
            </div>
            {rdOrder
              .filter((o) => o.status === "served")
              .map((dlOrd) => {
                return (
                  <DeliveredOrder
                    key={"dlOrder" + dlOrd.id}

                    client={dlOrd.client}

                    timeOrd={dlOrd.timeOrd}
                  />
                );
              })}
        </section>
      </section>
    </section>
  );
};

export default Readyorders;
