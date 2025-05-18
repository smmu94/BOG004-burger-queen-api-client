import React, { useEffect, useState } from "react";
import AddUser from "./components/addUser";
import UserCard from "./components/userCard";
import DeleteModal from "@/modules/admin/components/deleteModal";
import Navbar from "@/components/navBar";
import { useUsersStore } from "@/store/useUsersStore";
import { createPortal } from "react-dom";
import styles from "./adminUsers.module.scss";
import { NAVBAR_ITEMS } from "@/modules/admin/constants";

const AdminUsers = () => {
  const { users, getUsers, deleteUser } = useUsersStore();
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (user) => {
    setUserToDelete(user);
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setUserToDelete(null);
  };

  const handleConfirm = () => {
    deleteUser(userToDelete.id);
    setOpenModal(false);
    setUserToDelete(null);
  };

  return (
    <section className={styles["admin-users-view"]} data-testid="admin-users-view">
      <Navbar items={NAVBAR_ITEMS} />
      <div className={styles["admin-users-container"]} data-testid="admin-users-container">
        <AddUser />
        <div className={styles["users-inventory"]} data-testid="users">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              handleDelete={() => handleDelete(user)}
            />
          ))}
        </div>
      </div>
      {openModal &&
        createPortal(
          <DeleteModal onCancel={handleCancel} onConfirm={handleConfirm} />,
          document.body
        )}
    </section>
  );
};

export default AdminUsers;
