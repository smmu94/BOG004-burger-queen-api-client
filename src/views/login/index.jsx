import React from "react";
import Login from "@/components/login/login.jsx";
import logoburger from "@/images/LogoSample4.png";
import burgerCollage from "@/images/burger_collage.png";
import "./Logincontainer.scss";
import { LOGIN } from "./constants.js";

const Logincontainer = () => {
  return (
    <div className="login-container" data-testid="login-container">
      <div className="login-content-left">
        <img
          className="buger-collage"
          data-testid="buger-collage"
          src={burgerCollage}
          alt="burger-collage"
        />
        <h3 className="slogan">
          {LOGIN.slogan}
        </h3>
      </div>
      <div className="login-content-right">
        <img
          className="logo-burger"
          data-testid="logo-burger"
          src={logoburger}
          alt="logo-burger"
        />
        <Login />
      </div>
    </div>
  );
};

export default Logincontainer;
