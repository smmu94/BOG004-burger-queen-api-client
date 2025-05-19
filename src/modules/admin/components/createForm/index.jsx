import React from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import styles from "./createForm.module.scss";
import { noop } from "underscore";

const CreateForm = ({ fields, onSubmit, onCancel, initialValues, status, isEditing }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(initialValues);
  };

  const handleFormCancel = () => {
    if (onCancel) {
      onCancel();
      reset(initialValues);
    }
  };

  const error = (status.action === "add" || status.action === "update") && status.type === "error";
  const success =
    (status.action === "add" || status.action === "update") && status.type === "success";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles["create-form"]}
      data-testid="admin-create-form"
    >
      <div className={styles.inputs}>
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: inputField }) => (
              <Input
                id={field.name}
                label={field.label}
                placeholder={field.label}
                type={field.type}
                field={inputField}
                error={!!errors[field.name]}
                message={errors[field.name]?.message}
                options={field.options}
              />
            )}
          />
        ))}
      </div>
      <div className={styles.alerts}>
        {(error || success) && (
          <Alert
            variant={status.type === "error" ? "danger" : "success"}
            data-testid={`${status.type}-message`}
          >
            {status.message}
          </Alert>
        )}
      </div>
      <div className={`${styles.actions} ${isEditing ? styles["with-cancel"] : ""}`}>
        <Button type="submit" onClick={noop}>{isEditing ? "Update" : "Add"}</Button>
        {isEditing && (
          <Button type="button" onClick={handleFormCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
