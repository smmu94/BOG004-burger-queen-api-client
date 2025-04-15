import "./Readyorders.scss";
import Navbar from "../../components/navBar";
import { useEffect, useState, useMemo } from "react";
import { getOrder, updateOrder } from "../../providers/OrderProducts.js";
import ReadyOrder from "../../components/waiter/readyOrder/readyOrder/index.jsx";
import DeliveredOrder from "../../components/waiter/readyOrder/deliveredOrder/index.jsx";
import Table from "react-bootstrap/Table";
import { routes } from "../../utils/constants.js";

const Readyorders = () => {
  const channel = useMemo(() => new BroadcastChannel("orders"), []);
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
        setRdOrder(response.data); // guardamos los datos en el estado
      })
      .catch(() => {});
  };

  useEffect(() => {
    // useEffect es una función que se ejecuta cuando el componente se monta
    fetchOrders();
  }, []);

  useEffect(() => {
    channel.addEventListener("message", (event) => {
      if (event.data === "updateOrder") {
        fetchOrders();
      }
    });
    return () => channel.close();
  }, [channel]);

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

  return (
    <section>
      <Navbar
        item1="ÓRDENES"
        item2="PEDIDOS LISTOS"
        link1={routes.order}
        link2={routes.readyOrder}
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><p>HISTORIAL DE PEDIDOS</p></th>
              </tr>
              <tr className="subtitles-delivered">
                <th>Cliente</th>
                <th>Tiempo de entrega</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </Table>
        </section>
      </section>
    </section>
  );
};

export default Readyorders;
