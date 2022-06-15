import { useEffect } from 'react'; // librería para redireccionar
import { Navigate } from 'react-router-dom';
// import Logincontainer from "../views/Login";
import { getUserData } from '../providers/UserProvider';

const ProtectedRoute = ({ target, children }) => {
  // const navigate = useNavigate();
  const user = getUserData();
  console.log(user);

  const accessMap = {
    '/order': 'waiter',
    '/kitchen': 'chef',
    '/admin': 'admin',
  };
  console.log(target);
  console.log('acces', accessMap[target]);
  if (target === '/' && user) {
    const newTargetIndex = Object.entries(accessMap).findIndex(
      (role) => role[1] === user.user.roles
    );
    const newTarget = Object.keys(accessMap)[newTargetIndex];
    console.log('ya está logueado');
    return <Navigate to={newTarget} replace />;
  }
  if (accessMap[target] && !accessMap[target].includes(user?.user?.roles)) {
    console.log('no tiene acceso');
    return <Navigate to={'/'} replace />;
    // return navigate('/');
  }

  return children;
};

export default ProtectedRoute;
