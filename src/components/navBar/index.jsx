import React, { useState } from "react";
import { logout } from "@/components/navBar/utils.js";
import logo_navBar_mobile from "@/images/Logo-mobile-view.png";
import logo_navBar from "@/images/Logo-Navbar.png";
import { getUserData } from "@/providers/UserProvider.js";
import { Nav } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
import MenuNavBar from "./menuNavbar";
import "./navBar.scss";

const Navbar = ({ items }) => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const handleMenu = () => setMenu(!menu);
  const handleLogout = () => logout(navigate);

  const user = getUserData();

  return (
    <Nav className="NavbarItems">
      <div className="left-navBar">
        <img
          className="logo-navBar-mobile"
          data-testid="logo-mobile"
          src={logo_navBar_mobile}
          alt="logo-navBar"
        />
        <img
          className="logo-navBar"
          data-testid="logo-desktop"
          src={logo_navBar}
          alt="logo-navBar"
        />
        <Badge color="light" pill className="text-dark user-name">
          {user.user.name}
        </Badge>
      </div>
      {items.length ? (
        <>
          <GiHamburgerMenu
            className="menu-mobile"
            data-testid="hamburger-menu"
            onClick={handleMenu}
          />
          <div className={`menu-content${menu ? "-mobile" : ""}`}>
            <MenuNavBar items={items} />
          </div>
        </>
      ) : (
        <BiLogOut className="logout logout-only" data-testid="logout" onClick={handleLogout} />
      )}
    </Nav>
  );
};

export default Navbar;
