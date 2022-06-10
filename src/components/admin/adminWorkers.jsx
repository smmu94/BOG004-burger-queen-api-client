import "../css/adminWorkers.scss";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import AdminFormWorkers from "./adminFormWorkers";
import { GrEdit } from "react-icons/gr";
import { useState, useEffect } from "react";
// import { updateUser } from "../../providers/UserProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

const AdminWorkers = ({ id, name, email, password, roles, editUser, deleteUsers}) => {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({name, email, password: "", roles});

  // const editUser = (user) => {
  //   return updateUser(id, user).then((user) => {
  //     console.log('id', user)
  //     setEdit(false);
  //    });    
  // }
const onClick = () => {
 setEdit(true);
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
            onClick={onClick}
          />
          <RiDeleteBin6Line onClick={()=>deleteUsers(id)}/>
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
      ) : <AdminFormWorkers id={id} edit={setEdit} editUser={editUser} userData={userData}  />
      }
    </div>
  );
};

export default AdminWorkers;

// success={afterSave}