import { Navigate } from 'react-router-dom';
// import Logincontainer from "../views/Login";
import { getUserData } from '../providers/UserProvider';

const ProtectedRoute = ({ target, children }) => {
  // const navigate = useNavigate();
  const user = getUserData();

  const accessMap = {
    '/order': 'waiter',
    '/kitchen': 'chef',
    '/admin': 'admin',
  };
  if (target === '/' && user) {
    const newTargetIndex = Object.entries(accessMap).findIndex(
      (role) => role[1] === Object.keys(user?.user?.roles)[0])
    const newTarget = Object.keys(accessMap)[newTargetIndex];
    return <Navigate to={newTarget} replace />;
  }
  if (accessMap[target] && !accessMap[target].includes(Object.keys(user?.user?.roles)[0])) {
    return <Navigate to={'/'} replace />;
  
  }

  return children;
};

export default ProtectedRoute;
