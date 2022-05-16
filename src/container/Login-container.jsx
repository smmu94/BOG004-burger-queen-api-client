import "./css/Login-container.scss";
import Login from "../components/login.jsx";
import logoburger from "../images/LogoSample4.png";



function Logincontainer() {
  return (
    <div className="login-container">
      <img className="logo-burger" src={ logoburger } alt="logo-burger" />
      <div className="login">
          <Login/>
        </div>
      </div>
  );
}

export default Logincontainer;
