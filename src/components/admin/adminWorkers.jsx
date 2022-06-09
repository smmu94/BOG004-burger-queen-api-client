import '../css/adminWorkers.scss';
import { getUser } from '../../providers/UserProvider';
import { useState, useEffect } from 'react';

const AdminWorkers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser()
      .then((response) => {
        setUsers(response.data); // actualizamos el estado
      })
      .catch(() => {});
  }, []);

  return (
    <section>
      {users.map((user) => {
        return (
          <div className='worker'>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.roles}</p>
          </div>
        );
      })}
    </section>
  );
};

export default AdminWorkers;
