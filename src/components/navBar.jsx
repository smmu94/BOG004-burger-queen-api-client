import React from "react";
import "./css/navBar.scss";
import { Nav } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import logo_navBar_mobile from "../images/Logo-mobile-view.png";
import logo_navBar from "../images/Logo-Navbar.png";
import { useState } from "react";
import MenuNavBar from "./menuNavBar";

const Navbar = ({item1, item2, link1, link2}) => {
  const [menu, setMenu] = useState(false);
 

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <Nav className="NavbarItems">
        <img
          className="logo-navBar-mobile"
          src={logo_navBar_mobile}
          alt="logo-navBar"
        />
        <img className="logo-navBar" src={logo_navBar} alt="logo-navBar" />
        <GiHamburgerMenu className="menu-mobile" onClick={handleMenu} />
        {menu ? (
          <>
           <div className="menu-content-mobile"><MenuNavBar item1={item1} item2={item2} link1={link1} link2={link2}/></div> 
          </>
        ) : null}
        <div className="menu-content"><MenuNavBar item1={item1} item2={item2} link1={link1} link2={link2}/> </div>
      </Nav>
    </div>
  );
};

export default Navbar;
