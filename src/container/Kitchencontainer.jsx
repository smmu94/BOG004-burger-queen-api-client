import "./css/Kitchencontainer.scss";
import Navbar from "../components/navBar.jsx";
import { getOrder } from "../components/providers/OrderProducts.js";
import { useEffect, useState } from "react";
import Kitchen from "../components/kitchen";

const Kitchencontainer = () => {
  const [order, setOrder] = useState([]); //array de objetos

  const resetKitchen = (id) => {
    // localStorage.removeItem(id);
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

  useEffect(() => {
    // useEffect es una función que se ejecuta cuando el componente se monta
    getOrder() // llamamos a la función products() que está en el provider
      .then((response) => {
        // cuando la función products() se ejecuta, se ejecuta la función then()
        console.log(response.data);
        setOrder(response.data); // guardamos los datos en el estado
      })
      .catch(() => {});
  }, []);

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
