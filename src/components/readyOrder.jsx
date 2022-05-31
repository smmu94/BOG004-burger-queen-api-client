import './css/readyOrder.scss';
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import Timekeeper from "./Timekeeper.jsx";
import { updateOrder } from './providers/OrderProducts.js';
import { getId } from './providers/UserProvider.js';

const ReadyOrder = (props) => {
  const handleClick = () => {
    let dateNow = new Date();
    const upOrder = {
      userId: getId(),
      status: 'delivered',
      dateProcessed:
        dateNow.getFullYear() +
        '-' +
        (dateNow.getMonth() + 1) +
        '-' +
        dateNow.getDate() +
        ' ' +
        dateNow.getHours() +
        ':' +
        dateNow.getMinutes(),
    };
    updateOrder(props.id, upOrder).then((res) => {
      let timeMs = Math.abs(
        new Date(res.data.dateProcessed).getTime() -
          new Date(res.data.dataEntry).getTime()
      );

      console.log(timeMs);

      const timeOrder = (timeMs) => {
        let seconds = Math.floor((timeMs / 1000) % 60),
          minutes = Math.floor((timeMs / (1000 * 60)) % 60),
          hours = Math.floor((timeMs / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
      };
      console.log(timeOrder(timeMs));
    });
    props.addDeliveredOrder()

    
  };

  return (
    <div className='container-Kitchen'>
      <section className='container-order'>
        <p className='clientName'>Cliente: {props.client}</p>
        <div>
          {props.product.map((product) => {
            return (
              <section
                className='amount-product'
                key={'order-product-' + product.id}
              >
                <div className='amount'>{product.quantity}</div>
                <div className='product-name'>{product.name}</div>
              </section>
            );
          })}
        </div>
        <div className='dataEntry'>{props.dateProcessed}</div>
        <button type='button' className='btn-order' onClick={handleClick}>
          ENTREGAR ORDEN
        </button>
      </section>
    </div>
  );
};

export default ReadyOrder;
