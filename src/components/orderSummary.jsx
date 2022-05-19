import { useState } from "react";
import Productsummary from './productSummary';
import "./css/orderSummary.scss";

const Ordersummary = ({productList, handleRemoveProduct}) => {
  const totalPrice =  productList.reduce((total, product) => total + (product.price * product.quantity), 0);
  const [values, setValues] = useState({
    client: "",
  });
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    console.log(value);
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }
    return (
      <section className='contain-form-client'>
  <form className="form-client">
  <div>
    <p className="nameClient">CLIENTE</p>
    <input
      type="text"
      name="client"
      className="client"
      value={values.client}
      required
      onChange={handleChange}
    />
    </div>
    <Productsummary productList={ productList } handleRemoveProduct={handleRemoveProduct}/>
    <div className='final-summary'>
      <div>TOTAL: {totalPrice}</div>
    <button type="submit" className="btn-client">ENVIAR</button> 
    </div>
  </form>
  </section>);
  
};

export default Ordersummary;