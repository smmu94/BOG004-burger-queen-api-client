import {useState} from "react";
import './css/login.scss';

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(evt) {
    /*
      Previene el comportamiento default de los
      formularios el cual recarga el sitio
    */
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
  }
  function handleChange(evt) {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    const { target } = evt;
    const { name, value } = target;

    console.log(value)
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
  }
  return (
    <form className="form-login" onSubmit={handleSubmit}>
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
      <button type="submit" className="btn-login">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
