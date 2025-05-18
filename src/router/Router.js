import { routes } from "@/utils/constants";
import AdminproductsView from "@/modules/admin/adminProducts";
import Admincontainer from "@/modules/admin/adminUsers";
import Kitchencontainer from "@/modules/kitchen";
import Logincontainer from "@/modules/login";
import Ordercontainer from "@/modules/waiter/takeOrder";
import Readyorders from "@/modules/waiter/readyOrders";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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
