import "./css/Kitchencontainer.scss";
import Navbar from "../components/navBar.jsx";
import { getOrder } from "../providers/OrderProducts.js";
import { useEffect, useState, useMemo } from "react";
import Kitchen from "../components/kitchen/kitchen";


const Kitchencontainer = () => {
  const channel = useMemo(()=> new BroadcastChannel('orders'), []);
  const [order, setOrder] = useState([]); //array de objetos


  const resetKitchen = (id) => {
    console.log(id);
    const resetKitchenOrder = [...order]; //copia el array}
    console.log(resetKitchenOrder);
    if (resetKitchenOrder.find((p) => p.id === id)) {
      resetKitchenOrder.splice(
        resetKitchenOrder.findIndex((p) => p.id === id),
        1
      );
    }

    setOrder(resetKitchenOrder); // actualiza el estado
  };
  const fetchOrder =() => {
    getOrder() // llamamos a la función products() que está en el provider
      .then((response) => {
        // cuando la función products() se ejecuta, se ejecuta la función then()
        console.log(response.data);
        setOrder(response.data); // guardamos los datos en el estado
      })
      .catch(() => {});
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(()=>{
    console.log("Channel:", channel.name);
    channel.addEventListener("message",(event) => {
      if (event.data === "createOrder"){
        fetchOrder();
      }
    });
    return ()=> channel.close();
  }, [channel])


  return (
    <div>
      <Navbar item1="" item2="" link1="" link2="" />
      <div className="order-container">
        {order
          .filter((o) => o.status === "pending")
          .map((ord) => {
            return (
              <Kitchen
                key={"order-" + ord.id}
                id={ord.id}
                client={ord.client}
                product={ord.products}
                dataEntry={ord.dataEntry}
                resetKitchen={resetKitchen}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Kitchencontainer;
