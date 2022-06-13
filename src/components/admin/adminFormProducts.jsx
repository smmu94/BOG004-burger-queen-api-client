import "../css/adminFormProducts.scss";
import { useState, useEffect, useMemo } from "react";
import { Alert } from "reactstrap";
import { createProduct } from "../../providers/OrderProducts";
import {RiCloseCircleFill} from 'react-icons/ri';

const AdminFormProducts = ({ id, edit, editProducts, productData }) => {
  const channel = useMemo(() => new BroadcastChannel("product"), []);

  const [hasError, setHasError] = useState("");
  const [values, setValues] = useState(productData || { name: "", price: "", image: "", type: "" });
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
  const onClickUpdate = () => {
    editProducts(id,values);
    edit(false);
  }
  const startRegister = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product).then((response) => {
        console.log('response', response.data);
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
        <div className="close-icon">{edit ? (<RiCloseCircleFill  onClick={() => edit(false)} />) : null}</div>
        <div>
          <input
            id="name"
            type="name"
            name="name"
            placeholder="Nombre del Producto"
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
            placeholder="Precio del Producto"
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
            placeholder="Url de la Imagen"
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
            placeholder="Tipo de Producto"
            className="type-product"
            value={values.type}
            onChange={handleChange} // cuando se cambia el valor del input
            data-testid="type-product"
          />
        </div>
        {edit? (<button type="submit" className="btn-register" data-testid='update-product' onClick={onClickUpdate}>
          EDITAR PRODUCTO
        </button>) : <button type="submit" className="btn-register" data-testid='add-product' onClick={startRegister}>
          AGREGAR PRODUCTO
        </button>}
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
