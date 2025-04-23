import logo_navBar_mobile from "@/images/Logo-mobile-view.png";
import logo_navBar from "@/images/Logo-Navbar.png";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuNavBar from "./menuNavbar";
import "./navBar.scss";

const Navbar = ({ items }) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <Nav className="NavbarItems">
      <img
        className="logo-navBar-mobile"
        data-testid="logo-mobile"
        src={logo_navBar_mobile}
        alt="logo-navBar"
      />
      <img className="logo-navBar" data-testid="logo-desktop" src={logo_navBar} alt="logo-navBar" />
      <GiHamburgerMenu className="menu-mobile" data-testid="hamburger-menu" onClick={handleMenu} />
      <div className={`menu-content${menu ? "-mobile" : ""}`}>
        <MenuNavBar items={items} />
      </div>
    </Nav>
  );
};

export default Navbar;
