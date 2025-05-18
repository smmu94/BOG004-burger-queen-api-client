import React from "react";
import Button from "@/components/button";
import Card from "@/components/card";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUsersStore } from "@/store/useUsersStore";
import userImage from "@/assets/svg/default_user.svg";

const UserCard = ({ user, handleDelete }) => {
  const { setUserToEdit } = useUsersStore();

  return (
    <Card
      image={userImage}
      info={{ name: user.name, email: user.email, role: user.role }}
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
