import AdminWorkers from "@/components/admin/adminWorkers";
import AdminFormWorkers from "@/components/admin/adminWorkers/form";
import Navbar from "@/components/navBar";
import { deleteUser, getUser, updateUser } from "@/providers/UserProvider";
import { routes } from "@/utils/constants.js";
import { useEffect, useMemo, useState } from "react";
import "./Adminworkers.scss";

const Admincontainer = () => {
  const [users, setUsers] = useState([]);
  const channel = useMemo(()=> new BroadcastChannel('user'), []);
  

const fetchUsers =() => {
    getUser()
      .then((response) => {
        setUsers(response.data); // actualizamos el estado
      })
      .catch(() => {});
    }

    const editUser = (id, user) => {
      return updateUser(id, user).then((user) => {
        fetchUsers();
       });    
    }
    
    const deleteUsers = (id) => {
      return deleteUser(id).then((user) => {
        fetchUsers();
      });
    }

    useEffect(() => {
      fetchUsers();
    }, []);
    useEffect(()=>{
      channel.addEventListener("message",(event) => {
        if (event.data === "registerUser"){
          fetchUsers();
        }
      });
      return ()=> channel.close();
    }, [channel])
 
  return (
    <div>
      <Navbar
        item1="EMPLEADOS"
        item2="PRODUCTOS"
        link1={routes.admin}
        link2={routes.adminProducts}
      />
      <div className="workers">
      <div className="container-worker">
        <div className="admin-workers">
          <AdminFormWorkers />
        </div>
        </div>
        {users.map((user) => {
          return (
            <AdminWorkers
              key={"worker" + user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              password={user.password}
              roles={user.roles}
              // afterSave={fetchUsers}
              editUser={editUser}
              deleteUsers={deleteUsers}
            />
          
          );
        })}
      </div>
    </div>
  );
};

export default Admincontainer;
