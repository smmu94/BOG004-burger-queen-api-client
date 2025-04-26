import React from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/components/navBar/utils.js";
import "@/components/navBar/navBar.scss";

const MenuNavBar = ({ items }) => {
  const navigate = useNavigate();
  const handleLogout = () => logout(navigate);

  return (
    <>
      {items.map(({ label, path }, index) => (
        <NavLink data-testid={`link-${index}`} key={path} to={path}>
          {label}
        </NavLink>
      ))}
      <BiLogOut className="logout" data-testid="logout" onClick={handleLogout} />
    </>
  );
};

export default MenuNavBar;
