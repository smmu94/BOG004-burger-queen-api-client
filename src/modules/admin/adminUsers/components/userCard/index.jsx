import React from "react";
import Button from "@/components/button";
import Card from "@/components/card";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUsersStore } from "@/store/useUsersStore";
import userImage from "@/assets/svg/default_user.svg";

const UserCard = ({ user, handleDelete }) => {
  const { setUserToEdit } = useUsersStore();
  const userData = user?.user || user;
  const name = userData.name;
  const email = userData.email;
  const roles = userData.roles;
  return (
    <Card
      image={userImage}
      info={{ name, email, role: roles ? Object.keys(roles)[0] : "" }}
    >
      <Button onClick={() => setUserToEdit(user)}>
        <GrEdit />
      </Button>
      <Button onClick={handleDelete}>
        <RiDeleteBin6Line />
      </Button>
    </Card>
  );
};

export default UserCard;
