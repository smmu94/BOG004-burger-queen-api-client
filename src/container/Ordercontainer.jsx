import "./css/Ordercontainer.scss";
import Order from "../components/order.jsx";
import Ordersummary from "../components/orderSummary";
import Navbar from "../components/navBar.jsx";
import { useState } from "react";

const  Ordercontainer = (props) =>{
  const [summaryProducts, setSummaryProducts] = useState([]); //array de objetos

  const addProduct = (product) => { // add product to summary
    const newSummaryProducts = [...summaryProducts]; //copia el array
if(newSummaryProducts.find(p => p.id === product.id)){ // si el producto ya está en el array
  newSummaryProducts.find(p => p.id === product.id).quantity += 1; // aumenta la cantidad
}else{
  newSummaryProducts.push({...product, quantity: 1}); // si no está en el array, lo agrega
}
    setSummaryProducts(newSummaryProducts); // actualiza el estado
    console.log(newSummaryProducts)
              
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
    <div>
    <Navbar item1="ÓRDENES" item2="PEDIDOS LISTOS" link1="/order" link2="/readyorder" />
    <div className="order-container">
      <div className="order-summary">
        <Order handleAddProduct={addProduct}/>
        <Ordersummary  productList={summaryProducts} handleRemoveProduct={removeProduct} reset={resetProduct}/>
      </div>
    </div>
    </div>
  );
}

export default Ordercontainer;
