import React from "react";
import CreateForm from "@/modules/admin/components/createForm";
import { useUsersStore } from "@/store/useUsersStore";
import { useEffect, useMemo } from "react";
import { initialUserValues, userFields } from "./constants";

const AddUser = () => {
  const { addUser, updateUser, userToEdit, setUserToEdit, status, clearStatus } = useUsersStore();

  const initialFormValues = useMemo(
    () =>
      userToEdit
        ? {
            name: userToEdit.name,
            email: userToEdit.email,
            password: "",
            role: userToEdit.role,
          }
        : initialUserValues,
    [userToEdit]
  );

  const onSubmit = async (data) => {
    const user = { ...data };
    if (userToEdit) {
      await updateUser(userToEdit.id, user);
    } else {
      await addUser(user);
    }
    setUserToEdit(null);
  };

  const onCancel = () => {
    setUserToEdit(null);
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(clearStatus, 3000);
      return () => clearTimeout(timer);
    }
  }, [status.message, clearStatus]);

  return (
    <CreateForm
      fields={userFields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialFormValues}
      status={status}
      isEditing={!!userToEdit}
    />
  );
};

export default AddUser;
