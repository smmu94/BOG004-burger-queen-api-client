import "./css/kitchen.scss";
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import Timekeeper from "./Timekeeper.jsx";
import { updateOrder } from "./providers/OrderProducts.js";
import { getId } from "./providers/UserProvider.js";



const Kitchen = (props) => {

 const handleClick = () => {
  let dateNow = new Date();
  const upOrder = {
    userId: getId(),
    status: "delivered",
    dateProcessed: dateNow.getFullYear() + "-" + dateNow.getMonth() + "-" + dateNow.getDate() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds(),
  }
   updateOrder(props.id, upOrder)
   .then(res => console.log(res.data))

 
    console.log(upOrder);
// props.dataEntry

  }


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
        
        </div>
        <div className='dataEntry'>{props.dataEntry}</div>
        <button type="button" className="btn-order" onClick={handleClick}>
          ENVIAR
        </button>
      </section>
    </div>
  );
};

export default Kitchen;
