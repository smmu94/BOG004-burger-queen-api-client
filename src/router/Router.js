import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logincontainer from "../views/Login";
import Ordercontainer from "../views/Order";
import Kitchencontainer from "../views/Kitchen";
import Readyorders from "../views/ReadyOrders";
import Admincontainer from "../views/Adminworkers";
import AdminproductsView from "../views/Adminproducts";



const Routercomponent = () => {
  return (

        <Router>
          <Routes>
            <Route path="/" element={<Logincontainer />} />
            <Route path="/order" element={<Ordercontainer />} />
            <Route path="/kitchen" element={<Kitchencontainer />} />
            <Route path="/readyorder" element={<Readyorders />} />
            <Route path="/admin" element={<Admincontainer />} />
            <Route path="/admin-products" element={<AdminproductsView />} />
          </Routes>
        </Router>
   
  );
};

export default Routercomponent;
