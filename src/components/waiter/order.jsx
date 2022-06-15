import "../css/order.scss";
import { useEffect, useState, useMemo } from "react";
import { products } from "../../providers/OrderProducts";
import { Nav } from "react-bootstrap";
import Product from "./product";

export default function Order({ handleAddProduct }) {
  //handleAddProduct es una funcion que se le pasa como prop desde el container
  const [productos, setProductos] = useState([]); //a rray de objetos
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [foodType, setFoodType] = useState('Desayuno');
  const channel = useMemo(() => new BroadcastChannel("product"), []);
  
const fetchProducts = () => {
  products() // llamamos a la función products() que está en el provider
  .then((response) => {
    setProductos(response.data); // actualizamos el estado
  })
  .catch(() => {});
}

  useEffect(()=>{
    fetchProducts();
  }, []);

  useEffect(() => {
    
      setFilteredProducts(productos.filter((p) => p.type === foodType))
    
  },[foodType, productos]);

  useEffect(() => {
    console.log("Channel:", channel.name);
    channel.addEventListener("message", (event) => {
      if (event.data === "registerProduct") {
        fetchProducts();
      }
    });
    return () => channel.close();
  }, [channel]);


  return (
    <div className="order" >
      <h2>MENÚ</h2>
      <Nav className="type-order" >
        <button data-id="breakfast" onClick={()=> setFoodType("Desayuno")}>DESAYUNOS</button>
        <button data-id="lunch" onClick={()=> setFoodType("Almuerzo")}>ALMUERZOS</button>
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
    </div>
  );
}
