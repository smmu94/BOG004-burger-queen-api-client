import React from "react";
import "./css/navBar.scss";
import { BiLogOut } from "react-icons/bi";
import { useNavigate, NavLink } from "react-router-dom";
import {routes} from "../utils/constants";

const MenuNavBar = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate(routes.home);
  };
  return (
    <>
      <NavLink data-testid="link1" to={props.link1}>
        {props.item1}
      </NavLink>
      <NavLink to={props.link2}>{props.item2}</NavLink>
      <BiLogOut className="logout" data-testid="logout" onClick={logout} />
    </>
  );
};
export default MenuNavBar;
