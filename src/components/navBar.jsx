import React from "react";
import "./css/navBar.scss";
import { Nav } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import logo_navBar_mobile from "../images/Logo-mobile-view.png";
import logo_navBar from "../images/Logo-Navbar.png";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const logout=()=>{
    sessionStorage.clear();
    navigate('/');
  }
  return (
    <div>
      <Nav className="NavbarItems">
      <img className="logo-navBar" src={logo_navBar} alt="logo-navBar" />
        <img className="logo-navBar-mobile" src={logo_navBar_mobile} alt="logo-navBar" />
        <div className="menu-icon">
          <NavLink  data-testid='link1' to={props.link1}>{props.item1}</NavLink>
          <NavLink to={props.link2}>{props.item2}</NavLink>
          <BiLogOut className="logout" data-testid="logout" onClick={logout} />
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
