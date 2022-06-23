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
      (role) => role[1] === Object.keys(user?.user?.roles)[0])
    const newTarget = Object.keys(accessMap)[newTargetIndex];
    return <Navigate to={newTarget} replace />;
  }
  if (accessMap[target] && !accessMap[target].includes(Object.keys(user?.user?.roles)[0])) {
    return <Navigate to={'/'} replace />;
  
  }
  // if (accessMap[target] && !accessMap[target].includes(user?.user?.roles)) {
  //   console.log('user', user)
  //   console.log('no tiene acceso');
  //   return <Navigate to={'/'} replace />;
  //   // return navigate('/');
  // }

  return children;
};

export default ProtectedRoute;
