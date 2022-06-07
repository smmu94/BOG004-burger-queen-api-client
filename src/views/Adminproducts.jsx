import  "./css/Adminproducts.scss";
import Navbar from "../components/navBar.jsx";

const Adminproducts = () => {


  return (
    <div >
      <Navbar item1="EMPLEADOS" item2="PRODUCTOS" link1="/admin" link2="/admin-products" />
        <h1>VISTA DEL AMINISTRADOR</h1>
    </div>
  );
};
export default Adminproducts;