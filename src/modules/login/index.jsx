import React from "react";
import LoginForm from "./components/loginForm";
import logoburger from "@/assets/png/LogoSample4.png";
import burgerCollage from "@/assets/png/burger_collage.png";
import styles from "./login.module.scss";
import { LOGIN } from "./constants.js";

const Login = () => {
  return (
    <div className={styles["login-container"]} data-testid="login-container">
      <div className={styles["login-content-left"]}>
        <img
          className={styles["buger-collage"]}
          data-testid="buger-collage"
          src={burgerCollage}
          alt="burger-collage"
        />
        <h3 className={styles.slogan}>
          {LOGIN.slogan}
        </h3>
      </div>
      <div className={styles["login-content-right"]}>
        <img
          className={styles["logo-burger"]}
          data-testid="logo-burger"
          src={logoburger}
          alt="logo-burger"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;