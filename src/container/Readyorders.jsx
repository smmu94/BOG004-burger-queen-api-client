import './css/Readyorders.scss';
import Navbar from '../components/navBar.jsx';
import { useEffect, useState } from 'react';
import { getOrder } from '../components/providers/OrderProducts.js';
import ReadyOrder from '../components/readyOrder';
import DeliveredOrder from '../components/deliveredOrder'

const Readyorders = () => {
  const [rdOrder, setRdOrder] = useState([]); //array de objetos

  const addDeliveredOrder = (order) => { 
    const newRdOrder = [...rdOrder]; //copia el array
    newRdOrder.push(order); // agrega el pedido
    setRdOrder(newRdOrder); // actualiza el estado
  }


  useEffect(() => {
    // useEffect es una función que se ejecuta cuando el componente se monta
    getOrder() // llamamos a la función products() que está en el provider
      .then((response) => {
        // cuando la función products() se ejecuta, se ejecuta la función then()
        console.log(response.data);
        setRdOrder(response.data); // guardamos los datos en el estado

        

      })
      .catch(() => {});
  }, []);

  return (
    <div >
      <Navbar
        item1='ÓRDENES'
        item2='PEDIDOS LISTOS'
        link1='/order'
        link2='/readyorder'
      />
        <section className='containerReady' >
      <section className='readyOrders'>
        {rdOrder.map((ord) => {
          return (
            <ReadyOrder
              key={'rdOrder' + ord.id}
              id={ord.id}
              client={ord.client}
              product={ord.products}
              dateProcessed={ord.dateProcessed}
              addDeliveredOrder={addDeliveredOrder}
            />
          );
        })}
      </section>
      <section className='deliveredOrders'>
        < DeliveredOrder />

      </section>
      </section>
    </div>
  );
};

export default Readyorders;
