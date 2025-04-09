import "../css/order.scss";
import { useEffect, useState, useMemo } from "react";
import { products } from "../../providers/OrderProducts";
import { Nav } from "react-bootstrap";
import Product from "./product";

export default function Order({ handleAddProduct }) {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [foodType, setFoodType] = useState("Desayuno");
  const channel = useMemo(() => new BroadcastChannel("product"), []);

  const fetchProducts = () => {
    products()
      .then((response) => {
        setProductos(response.data);
      })
      .catch(() => { });
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {

    setFilteredProducts(productos.filter((p) => p.type === foodType))

  }, [foodType, productos]);

  console.log("productos", productos);
  console.log("filteredProducts", filteredProducts);


  useEffect(() => {
    channel.addEventListener("message", (event) => {
      if (event.data === "registerProduct") {
        fetchProducts();
      }
    });
    return () => channel.close();
  }, [channel]);

  return (
    <section className="order" >
      <Nav className="type-order" >
        {["Desayuno", "Almuerzo"].map((type) => (
          <button
            key={type}
            data-id={type.toLowerCase()}
            className={`foodType ${foodType === type ? "selected" : ""}`}
            onClick={() => setFoodType(type)}
          >
            {type}
          </button>
        ))}
      </Nav>
      <div data-testid="products" className="products">
        {filteredProducts.map((producto) => {
          return (
            <Product
              key={"ord" + producto.id}
              id={producto.id}
              handleAddProduct={handleAddProduct}
              name={producto.name}
              price={producto.price}
              image={producto.image}
              type={producto.type}
              data-testid="products-product"
            />
          );
        }
        )}
      </div>
    </section>
  );
}
