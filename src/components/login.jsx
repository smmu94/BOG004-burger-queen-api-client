import { useState } from "react";
import "./css/login.scss";
import { login, saveUser } from "./providers/UserProvider";
import { useNavigate } from "react-router-dom"; // librería para redireccionar
import { useForm } from "react-hook-form"; // librería para validacion de formulario
import { Alert }from "reactstrap";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // librería validacion form

  const [hasError, setHasError] = useState('');

  const navigate = useNavigate(); // propiedad react para redireccionar
  const [values, setValues] = useState({
    // estado para guardar los datos del formgitulario
    email: "",
    password: "",
  });
  const startLogin = async () => {
    // funcion para iniciar sesion, (se llama con el handleSumbmit)
    try {
      const response = await login(values); // llamada a la funcion login de la api
      saveUser(response.data);
      navigate("/order");
      setHasError(false);
    } catch {
      setHasError('Usuario y/o contraseña no encontrado');
      // alert('Usuario y/o contraseña no encontrado');
    }
  };
  const handleChange = (e) => {
    // funcion para guardar los datos del formulario
    const { target } = e;
    const { name, value } = target;
    // console.log(value);
    const newValues = {
      // nuevo estado con los datos del formulario
      ...values, // estado anterior
      [name]: value, // nuevo valor
    };
    setValues(newValues); // actualizar el estado
  };
  const style = {
    color: "white",
  };
  return (
    /* formulario de login */
    <form  noValidate className="form-login" onSubmit={handleSubmit(startLogin)}>
      <div>
      <label  htmlFor="email">email</label>
      
      <input 
      id="email"
        type="email"
        name="email"
        placeholder="Usuario"
        className="email"
        value={values.email}
        {...register("email", {
          // inicio validacion del formulario
          required: {
            value: true,
            message: "El campo es requerido",
          },
          pattern: {
            // validacion de email con expresion regular
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "El formato no es correcto",
          },
        })}
        onChange={handleChange} // cuando se cambia el valor del input
        data-testid='login-email'
      />
      {errors.email && <span style={style}>{errors.email.message}</span>}
      </div>
      <div>
      <label  htmlFor="password">password</label>
     
      <input 
      id="password" // input para el password
        type="password"
        name="password"
        placeholder="Contraseña"
        className="password"
        value={values.password}
        {...register("password", {
          // inicio validacion del formulario
          required: {
            value: true,
            message: "El campo es requerido",
          },
          minLength: {
            // validacion de longitud minima
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
          maxLength: {
            // validacion de longitud maxima
            value: 12,
            message: "La contraseña debe tener máximo 12 caracteres",
          },
        })}
        onChange={handleChange} // cuando se cambia el valor del input
        data-testid='login-password'
      />
      {errors.password && <span style={style}>{errors.password.message}</span>}
      </div>
      {hasError && <p data-testid="login-error-message">{hasError}</p>} 
      <button type="submit" className="btn-login">
        INICIAR SESIÓN
      </button>
    </form>
  );
};

export default Login;

// "email":"waiter@foodelicious.com"
// clave 123456
