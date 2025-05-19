import React from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import { getUser, login, saveUser } from "@/providers/UserProvider";
import { roles, routes } from "@/utils/constants";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { formValidation, loginError, tags } from "./constants";
import { noop } from "underscore";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [hasError, setHasError] = useState("");
  const navigate = useNavigate();

  const startLogin = async (data) => {
    try {
      const response = await login(data);
      saveUser(response.data);

      const users = await getUser();
      const user = users.data.find((user) => user.email === data.email);

      switch (Object.keys(user.roles)[0]) {
        case roles.admin:
          navigate(routes.admin);
          break;
        case roles.waiter:
          navigate(routes.order);
          break;
        default:
          navigate(routes.kitchen);
          break;
      }
      reset();
    } catch {
      setHasError(loginError);
    }
  };

  return (
    <form
      noValidate
      className={styles["form-login"]}
      data-testid="login-component"
      onSubmit={handleSubmit(startLogin)}
    >
      <div className={styles.inputs}>
        <div className={styles.email}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: formValidation.email.required },
              pattern: {
                value: formValidation.email.pattern.value,
                message: formValidation.email.pattern.message,
              },
            }}
            render={({ field }) => (
              <Input
                id={tags.email}
                type={tags.email}
                label={tags.email}
                placeholder="user@gmail.com"
                field={field}
                error={!!errors.email}
                message={errors.email?.message}
                data-testid="login-email"
              />
            )}
          />
        </div>
        <div className={styles.password}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: formValidation.password.required },
              minLength: formValidation.password.minLength,
              maxLength: formValidation.password.maxLength,
            }}
            render={({ field }) => (
              <Input
                id="password"
                type="password"
                label={tags.password}
                placeholder="password"
                field={field}
                error={!!errors.password}
                message={errors.password?.message}
                data-testid="login-password"
              />
            )}
          />
        </div>
      </div>
      <Button type="submit" size="large" onClick={noop}>
        {tags.loginBtn}
      </Button>
      <div className={styles["alert-error"]}>
        <Alert
          variant="danger"
          className={styles.message}
          data-testid="login-error-message"
          show={!!hasError}
        >
          {hasError}
        </Alert>
      </div>
    </form>
  );
};

export default LoginForm;