import "./css/order.scss";
import { useEffect, useState } from "react";
import {
  products,
  createProduct,
  deleteProduct,
} from "./providers/OrderProducts";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "./product";

export default function Order() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // createProduct({
    //     name: "pizza",
    //     price: "6",
    //     image: "",
    //     type: "Desayuno",
    //     userId: 2,
    //   }).then((response) => {
    //     console.log(response.data);
    //     }).catch(() => {});

    // deleteProduct(8);
    products()
      .then((response) => {
        // console.log(response.data);
        setProductos(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="order">
      <h2>MENÚ</h2>
      <Nav className="type-order">
        <Link to="">DESAYUNOS</Link>
        <Link to="">ALMUERZOS</Link>
      </Nav>

      {productos.map((producto, index) => (
        <Product
          key={producto.id}
          data={producto}
        />
      ))}
    </div>
  );
}
