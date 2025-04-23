import React from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "@/utils/constants";
import "@/components/navBar/navBar.scss";

const MenuNavBar = ({ items }) => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate(routes.home);
  };

  return (
    <>
      {items.map(({ label, path }, index) => (
        <NavLink data-testid={`link-${index}`} key={path} to={path}>
          {label}
        </NavLink>
      ))}
      <BiLogOut className="logout" data-testid="logout" onClick={logout} />
    </>
  );
};

export default MenuNavBar;
