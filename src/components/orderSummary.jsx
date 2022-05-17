import { useState } from "react";
import "./css/orderSummary.scss";

const Ordersummary = (props) => {
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
  <form className="form-client">
   <p className="nameClient">CLIENTE</p>
    <input
      type="text"
      name="client"
      className="client"
      value={values.client}
      required
      onChange={handleChange}
    />
    <button type="submit" className="btn-client">ENVIAR</button> 
  </form>);
};

export default Ordersummary;