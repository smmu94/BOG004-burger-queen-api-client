import React, { useState } from "react";
import "../css/login.scss";
import { login, saveUser, getUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";
import { Form } from "react-bootstrap";
import { loginError, tags, formValidation } from "./constants";
import { roles, routes } from "../../utils/constants";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const [hasError, setHasError] = useState("");

  const navigate = useNavigate();
  const startLogin = async (e) => {
    try {
      const values = getValues();
      const response = await login(values);
      saveUser(response.data);

      const users = await getUser();
      const user = users.data.find((user) => user.email === values.email);

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
      className="form-login"
      data-testid="login-componente"
      onSubmit={handleSubmit(startLogin)}
    >
      <div className="inputs">
        <div className="email">
          <Form.Label htmlFor="email" visuallyHidden>
            {tags.email}
          </Form.Label>
          <input
            id="email"
            type="email"
            name="email"
            className={errors.email ? "input-error" : ""}
            placeholder="User"
            {...register("email", {
              required: {
                value: true,
                message: formValidation.email.required,  
              },
              pattern: {
                value: formValidation.email.pattern.value,
                message: formValidation.email.pattern.message,
              },
            })}
            data-testid="login-email"
          />
          <span className="error">{errors.email?.message || "\u00A0"}</span>
        </div>
        <div className="password">
          <Form.Label htmlFor="password" visuallyHidden>
            {tags.password}
          </Form.Label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className={errors.password ? "input-error" : ""}
            {...register("password", {
              required: {
                value: true,
                message: formValidation.password.required,
              },
              minLength: formValidation.password.minLength,
              maxLength: formValidation.password.maxLength,
            })}
            data-testid="login-password"
          />
          <span className="error">{errors.password?.message || "\u00A0"}</span>
        </div>
      </div>
      <button type="submit" className="btn-login">
        {tags.loginBtn}
      </button>
      <div className="alert-error">
        <Alert
          color="danger"
          className="message"
          isOpen={!!hasError}
          data-testid="login-error-message"
        >
          {hasError}
        </Alert>
      </div>
    </form>
  );
};

export default Login;
