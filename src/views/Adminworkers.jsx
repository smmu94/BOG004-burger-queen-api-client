import  "./css/Adminworkers.scss";
import Navbar from "../components/navBar.jsx";
import AdminFormWorkers from "../components/admin/adminFormWorkers.jsx";

const Admincontainer = () => {


  return (
    <div >
      <Navbar item1="EMPLEADOS" item2="PRODUCTOS" link1="/admin" link2="/admin-products" />
      <div className="admin-workers">
        <AdminFormWorkers />
        </div>
    </div>
  );
};
export default Admincontainer;
