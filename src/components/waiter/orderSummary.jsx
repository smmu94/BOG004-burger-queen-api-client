import { useState, useEffect, useMemo } from "react";
import Productsummary from "./productSummary";
import "../css/orderSummary.scss";
import { createOrder } from "../../providers/OrderProducts.js";
import { Alert } from "reactstrap";

const Ordersummary = ({ productList, handleRemoveProduct, reset }) => {
  const channel = useMemo(() => new BroadcastChannel("orders"), []);

  const [values, setValues] = useState({
    client: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let dateNow = new Date();
    const oder = {
      client: values.client,
      products: productList,
      status: "pending",
      dataEntry:
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

    createOrder(oder)
      .then((response) => {
        setMessage("Order created successfully");

        channel.postMessage("createOrder");
      })
      .catch(() => {});

    setValues({
      client: "",
    });

    reset();

    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  useEffect(() => {
    return () => channel.close();
  }, [channel]);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };

  const totalPrice = productList.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <form id="form" className="form-client" onSubmit={handleSubmit}>
      <div className="client">
        <p className="nameClient">Customer Name</p>
        <input
          type="text"
          name="client"
          className="input-client"
          value={values.client}
          required
          onChange={handleChange}
          data-testid="input-client"
        />
      </div>
      <Productsummary
        productList={productList}
        handleRemoveProduct={handleRemoveProduct}
      />
      <div className="final-summary">
        <div>Total: ${totalPrice}</div>
        <Alert color="success" isOpen={!!message} data-testid="created-order">
          {message}
        </Alert>
        <button type="submit" data-testid="btn-client" className="btn-client">
          Send
        </button>
      </div>
    </form>
  );
};

export default Ordersummary;
