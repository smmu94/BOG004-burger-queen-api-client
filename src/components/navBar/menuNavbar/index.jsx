import React from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "@/utils/constants";
import "@components/navBar/navBar.scss";

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
