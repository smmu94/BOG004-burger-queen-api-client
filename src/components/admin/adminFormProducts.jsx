import "../css/adminFormProducts.scss";
import { useState, useEffect, useMemo } from "react";
import { Alert } from "reactstrap";
import { createProduct } from "../../providers/OrderProducts";

const AdminFormProducts = () => {
  const channel = useMemo(() => new BroadcastChannel("product"), []);

  const [hasError, setHasError] = useState("");
  const [values, setValues] = useState({
    // estado para guardar los datos del formgitulario
    name: "",
    price: "",
    image: "",
    type: "",
  });
  const [message, setMessage] = useState("");
  const dateNow = new Date();
  const product = {
    name: values.name,
    price: values.price,
    image: values.image,
    type: values.type,
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
  const startRegister = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product).then((response) => {
        channel.postMessage("registerProduct");
        setMessage("Producto creado correctamente");
      });
    } catch {
      setHasError("El producto ya está registrado");
    }
    setTimeout(() => {
      setMessage(null);
    }, 1500);
    setValues({
      name: "",
      price: "",
      image: "",
      type: "",
    });
  };

  useEffect(() => {
    return () => channel.close();
  }, [channel]);

  const handleChange = (e) => {
    // funcion para guardar los datos del formulario
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      // nuevo estado con los datos del formulario
      ...values, // estado anterior
      [name]: value, // nuevo valor
    };
    setValues(newValues); // actualizar el estado
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form noValidate className="form-products" onSubmit={handleSubmit}>
        <div>
          <input
            id="name"
            type="name"
            name="name"
            placeholder="Nombre"
            className="name-product"
            value={values.name}
            onChange={handleChange} // cuando se cambia el valor del input
            data-testid="name-product"
          />
        </div>
        <div>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="price"
            className="price-product"
            value={values.price}
            onChange={handleChange} // cuando se cambia el valor del input
            data-testid="price-product"
          />
        </div>
        <div>
          <input
            id="image" // input para el password
            type="url"
            name="image"
            placeholder="image"
            className="image-product"
            value={values.image}
            onChange={handleChange} // cuando se cambia el valor del input
            data-testid="image-product"
          />
        </div>

        <div>
          <input
            id="type" // input para el password
            type="text"
            name="type"
            placeholder="type"
            className="type-product"
            value={values.type}
            onChange={handleChange} // cuando se cambia el valor del input
            data-testid="type-product"
          />
        </div>

        <button type="submit" className="btn-register" onClick={startRegister}>
          REGISTRAR
        </button>
        {hasError && (
          <Alert data-testid="register-error-message">{hasError}</Alert>
        )}
      </form>
      {message && (
        <Alert color="success" data-testid="created-product">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default AdminFormProducts;
