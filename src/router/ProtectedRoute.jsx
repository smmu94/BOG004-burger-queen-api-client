import { getUserData } from "@/providers/UserProvider";
import { roles, routes } from "@/utils/constants";
import { Navigate } from "react-router-dom";

const accessMap = {
  [routes.admin]: [roles.admin],
  [routes.adminProducts]: [roles.admin],
  [routes.order]: [roles.waiter],
  [routes.readyOrder]: [roles.waiter],
  [routes.kitchen]: [roles.chef],
};

const ProtectedRoute = ({ target, children }) => {
  const role = Object.keys(getUserData()?.user?.roles || {})[0];

  if (target === routes.home && role) {
    const redirect =
      Object.entries(accessMap).find(([_, roles]) =>
        roles.includes(role)
      )?.[0] || routes.home;
    return <Navigate to={redirect} replace />;
  }

  if (accessMap[target] && !accessMap[target].includes(role)) {
    return <Navigate to={routes.home} replace />;
  }

  return children;
};
export default ProtectedRoute;
