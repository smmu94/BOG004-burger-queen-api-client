import React from "react";
import "./css/navBar.scss";
import { Nav } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import logo_navBar from "../images/Logo-Navbar.png";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="menu-icon">
          <Link to="">{props.item1}</Link>
          <Link to="">{props.item2}</Link>
          <BiLogOut className="logout" onClick={logout} />
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
