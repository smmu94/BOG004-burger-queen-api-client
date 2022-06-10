import "../css/adminWorkers.scss";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import AdminFormWorkers from "./adminFormWorkers";
import { GrEdit } from "react-icons/gr";
import { useState, useEffect } from "react";
import { updateUser } from "../../providers/UserProvider";

const AdminWorkers = ({ id, name, email, password, afterSave, roles }) => {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({name, email, password: "", roles});
  const editUser = (user) => {
    console.log(user)
   
    return updateUser(id, user).then((user) => {
      console.log('id', user)
      setEdit(false);
     });
     
  }

  useEffect(()=>{
    setUserData({name, email, password: "", roles})
  }, [name, email, password, roles])

  return (
    <div className="worker"> 
      
      {edit === false ? (
        <div>
          <GrEdit
            data-testid="edit-worker"
            className="edit-worker"
            onClick={() => setEdit(true)}
          />
          <p>
            <CgProfile className="icon" />
            {name}
          </p>
          <p>
            <AiOutlineMail className="icon" />
            {email}
          </p>
          <p>
            <ImProfile className="icon" />
            {roles}
          </p>
        </div>
      ) : <AdminFormWorkers edit={edit} editUser={editUser} userData={userData} success={afterSave} />
      }
    </div>
  );
};

export default AdminWorkers;
