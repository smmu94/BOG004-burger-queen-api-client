import AdminProducts from "@/components/admin/adminProducts";
import AdminFormProducts from "@/components/admin/adminProducts/form";
import Navbar from "@/components/navBar";
import { deleteProduct, products, updateProduct } from "@/providers/OrderProducts.js";
import { useEffect, useMemo, useState } from "react";
import "./Adminproducts.scss";
import { NAVBAR_ITEMS } from "./constants";

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
  };

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
      <Navbar items={NAVBAR_ITEMS} />
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
