import {useState} from "react";
import './css/login.scss';
import { login, saveUser } from "./providers/UserProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  function startLogin(evt) {
    evt.preventDefault();
    login(values).then((response) => {
      saveUser(response.data);
    }).catch(() => {});
    navigate('/order')   
  }
  function handleChange(evt) {

    const { target } = evt;
    const { name, value } = target;

    console.log(value)
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }
  return (
    <form className="form-login" onSubmit={startLogin}>
      <input
        type="email"
        name="email"
        placeholder="Usuario"
        className="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="password"
        value={values.password}
        onChange={handleChange}
      />
      <select className="position">
        <option value="select">Cargo</option>
        <option value="admin">Administrador</option>
        <option value="waiter">Mesero</option>
        <option value="chef">Chef</option>
      </select>
      <button type="submit" className="btn-login">INICIAR SESIÓN</button>
    </form>
  );
}

export default Login;

// "email":"waiter@foodelicious.com"
// clave 123456