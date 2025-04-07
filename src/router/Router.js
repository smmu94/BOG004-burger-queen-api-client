import { Routes, Route } from "react-router-dom";
import Logincontainer from "../views/Login";
import Ordercontainer from "../views/Order";
import Kitchencontainer from "../views/Kitchen";
import Readyorders from "../views/ReadyOrders";
import Admincontainer from "../views/Adminworkers";
import AdminproductsView from "../views/Adminproducts";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "../utils/constants";

const Routercomponent = () => {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={
          <ProtectedRoute target={routes.home}>
            <Logincontainer />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.order}
        element={
          <ProtectedRoute target={routes.order}>
            <Ordercontainer />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.kitchen}
        element={
          <ProtectedRoute target={routes.kitchen}>
            <Kitchencontainer />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.readyOrder}
        element={
          <ProtectedRoute target={routes.readyOrder}>
            <Readyorders />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.admin}
        element={
          <ProtectedRoute target={routes.admin}>
            <Admincontainer />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.adminProducts}
        element={
          <ProtectedRoute target={routes.adminProducts}>
            <AdminproductsView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default Routercomponent;
