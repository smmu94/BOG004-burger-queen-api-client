import "./css/Ordercontainer.scss";
import Order from "../components/waiter/order.jsx";
import Ordersummary from "../components/waiter/orderSummary";
import Navbar from "../components/navBar.jsx";
import { useState } from "react";
import { routes } from "../utils/constants.js";

const  Ordercontainer = () =>{
  const [summaryProducts, setSummaryProducts] = useState([]); //array de objetos

  const addProduct = (product) => { // add product to summary
    const newSummaryProducts = [...summaryProducts]; //copia el array
if(newSummaryProducts.find(p => p.id === product.id)){ // si el producto ya está en el array
  newSummaryProducts.find(p => p.id === product.id).quantity += 1; // aumenta la cantidad
}else{
  newSummaryProducts.push({...product, quantity: 1}); // si no está en el array, lo agrega
}
    setSummaryProducts(newSummaryProducts); // actualiza el estado

              
  }
  const removeProduct = (id) => { // remove product to summary
    const removeSummaryProducts = [...summaryProducts]; //copia el array
      removeSummaryProducts.find(p => p.id === id).quantity -= 1; // disminuye la cantidad
      if (removeSummaryProducts.find(p => p.id === id).quantity === 0) { // si la cantidad es 0, lo elimina
        removeSummaryProducts.splice(removeSummaryProducts.findIndex(p => p.id === id), 1); 
      }
    setSummaryProducts(removeSummaryProducts); // actualiza el estado
  }



  const resetProduct = () => {
      setSummaryProducts([]);
  }


  return (
    <div data-testid='order-view'>
    <Navbar item1="ÓRDENES" item2="PEDIDOS LISTOS" link1={routes.order} link2={routes.readyOrder} />
    <div className="order-container" data-testid='order-container'>
        <Order handleAddProduct={addProduct}/>
        <Ordersummary  productList={summaryProducts} handleRemoveProduct={removeProduct} reset={resetProduct}/>
    </div>
    </div>
  );
}

export default Ordercontainer;
