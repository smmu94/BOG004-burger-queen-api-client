import "./css/Ordercontainer.scss";
import Navbar from "../components/navBar.jsx";

const  Readyorders = (props) =>{
  
  return (
    <div>
      <Navbar item1="ÓRDENES" item2="PEDIDOS LISTOS" link1="/order" link2="/readyorder"/>
    <h1>VISTA HISTORIAL ÓRDENES LISTAS</h1>
    </div>
  );
}

export default Readyorders;
