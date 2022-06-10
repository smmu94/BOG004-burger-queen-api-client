import  "./css/Adminproducts.scss";
import Navbar from "../components/navBar.jsx";
import AdminFormProducts from "../components/admin/adminFormProducts.jsx";
import AdminProducts from "../components/admin/adminProducts.jsx";
import { useState, useEffect, useMemo } from "react";
import { products } from "../providers/OrderProducts";

const Adminproducts = () => {

  const [product, setProduct] = useState([]);
  const channel = useMemo(()=> new BroadcastChannel('product'), []);

  const fetchProducts =() => {
    products()
      .then((response) => {
        setProduct(response.data); // actualizamos el estado
      })
      .catch(() => {});
    }
    useEffect(() => {
      fetchProducts();
    }, []);
    useEffect(()=>{
      console.log("Channel:", channel.name);
      channel.addEventListener("message",(event) => {
        if (event.data === "registerProduct"){
          fetchProducts();
        }
      });
      return ()=> channel.close();
    }, [channel])
 



  return (
    <div >
      <Navbar item1="EMPLEADOS" item2="PRODUCTOS" link1="/admin" link2="/admin-products" />
      
      <div className="products">
        <div className="admin-products">
          <AdminFormProducts/>
        </div>
        {product.map((product) => {
          return (
            <AdminProducts
              key={"products" + product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Adminproducts;






  

