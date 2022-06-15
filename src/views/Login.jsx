import "./css/Logincontainer.scss";
import Login from "../components/login/login.jsx";
import logoburger from "../images/LogoSample4.png";



const Logincontainer = () =>{
  return (
    <div className="login-container" data-testid='login-container'>
      <img className="logo-burger" data-testid='logo-burger' src={ logoburger } alt="logo-burger" />
      <div className="login" data-testid='login'>
          <Login/>
        </div>
      </div>
  );
}

export default Logincontainer;
