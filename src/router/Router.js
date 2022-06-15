import { Routes, Route } from 'react-router-dom';
import Logincontainer from '../views/Login';
import Ordercontainer from '../views/Order';
import Kitchencontainer from '../views/Kitchen';
import Readyorders from '../views/ReadyOrders';
import Admincontainer from '../views/Adminworkers';
import AdminproductsView from '../views/Adminproducts';
import ProtectedRoute from './ProtectedRoute';

const Routercomponent = () => {
  return (
    <Routes>
  <Route
        path='/'
        element={
          <ProtectedRoute target='/'>
            <Logincontainer />
          </ProtectedRoute>
        }
      />
{/* 
      <Route index element={<Logincontainer />} />
      <Route path='/' element={<Logincontainer />} /> */}

      <Route
        path='/order'
        element={
          <ProtectedRoute target='/order'>
            <Ordercontainer />
          </ProtectedRoute>
        }
      />

      <Route
        path='/kitchen'
        element={
          <ProtectedRoute target='/kitchen'>
            <Kitchencontainer />
          </ProtectedRoute>
        }
      />

      <Route
        path='/readyorder'
        element={
          <ProtectedRoute target='/readyorder'>
            <Readyorders />
          </ProtectedRoute>
        }
      />

      <Route
        path='/admin'
        element={
          <ProtectedRoute target='/admin'>
            <Admincontainer />
          </ProtectedRoute>
        }
      />

      <Route
        path='/admin-products'
        element={
          <ProtectedRoute target='/admin-products'>
            <AdminproductsView />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default Routercomponent;
