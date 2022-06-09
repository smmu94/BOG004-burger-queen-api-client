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
        setMessage("Orden creada con éxito");

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
    <section className="contain-form-client">
      <form id="form" className="form-client" onSubmit={handleSubmit}>
        <div>
          <p className="nameClient">CLIENTE</p>
          <input
            type="text"
            name="client"
            className="client"
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
          <div>TOTAL: {totalPrice}</div>
          <button type="submit" data-testid="btn-client" className="btn-client">
            ENVIAR
          </button>
        </div>
      </form>
      {message && (
            <Alert color="success" data-testid="created-order">
              {message}
            </Alert>
          )}
    </section>
  );
};

export default Ordersummary;
