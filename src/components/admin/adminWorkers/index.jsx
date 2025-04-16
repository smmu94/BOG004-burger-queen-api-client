import './adminWorkers.scss';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import AdminFormWorkers from './form';
import { GrEdit } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AdminWorkers = ({
  id,
  name,
  email,
  password,
  roles,
  editUser,
  deleteUsers,
}) => {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    name,
    email,
    password: '',
    roles,
  });

  const onClick = () => {
    setEdit(true);
  };

  useEffect(() => {
    setUserData({ name, email, password: '', roles });
  }, [name, email, password, roles]);

  return (
    <div className='admin-worker' data-testid='admin-worker'>
      {edit === false ? (<>
        <div>
        <div className='admin-worker-info'>
          <p>
            <CgProfile className='icon' />
            {name}
          </p>
          <p>
            <AiOutlineMail className='icon' />
            {email}
          </p>
          <p>
            <ImProfile className='icon' />
            {Object.keys(roles).map((key) => {
              return `${roles[key] ? key : ''}`;
            }
            )}
          </p>
          </div>
          <div className='buttons-worker'>
            <GrEdit
              data-testid='edit-worker'
              className='edit-worker'
              onClick={onClick}
            />
            <RiDeleteBin6Line
              data-testid='delete-worker'
              onClick={() => deleteUsers(id)}
            />
            
          </div>
        </div></>
      ) : (
        <div className='edit' data-testid='admin-form-workers'>
          
          
          <AdminFormWorkers
            id={id}
            edit={setEdit}
            editUser={editUser}
            userData={userData}
          />
        </div>
      )}
    </div>
  );
};

export default AdminWorkers;

// success={afterSave}
