import "./Adminproducts.scss";
import Navbar from "../../components/navBar.jsx";
import AdminFormProducts from "../../components/admin/adminFormProducts.jsx";
import AdminProducts from "../../components/admin/adminProducts.jsx";
import { useState, useEffect, useMemo } from "react";
import { products, deleteProduct, updateProduct } from "../../providers/OrderProducts.js";
import { routes } from "../../utils/constants.js";

const AdminproductsView = () => {
  const [product, setProduct] = useState([]);
  const channel = useMemo(() => new BroadcastChannel("product"), []);

  const fetchProducts = () => {
    products()
      .then((response) => {
        setProduct(response.data); // actualizamos el estado
      })
      .catch(() => {});
  };
  const deleteProducts = (id) => {
    return deleteProduct(id).then(() => {
      fetchProducts();
    });
  }
  
    const editProducts = (id, product) => {
      return updateProduct(id, product).then(() => {
        fetchProducts();
       });    
    };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    channel.addEventListener("message", (event) => {
      if (event.data === "registerProduct") {
        fetchProducts();
      }
    });
    return () => channel.close();
  }, [channel]);

  return (
    <div>
      <Navbar
        item1="EMPLEADOS"
        item2="PRODUCTOS"
        link1={routes.admin}
        link2={routes.adminProducts}
      />
      <div className="products">
        <div className="container-form">
        <div className="admin-products">
          <AdminFormProducts />
        </div>
        </div>
        {product.map((product) => {
          return (
            <AdminProducts
              key={"products" + product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              type={product.type}
              deleteProducts={deleteProducts}
              editProducts={editProducts}
              data-testid="products-product"
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminproductsView;
