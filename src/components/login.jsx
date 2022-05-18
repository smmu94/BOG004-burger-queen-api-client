import {useState} from "react";
import './css/login.scss';
import { login, saveUser } from "./providers/UserProvider";
import { useNavigate } from "react-router-dom"; // librería para redireccionar
import { useForm } from "react-hook-form"; // librería para validacion de formulario

const Login = () => { 

  const { register, handleSubmit, formState: { errors } } = useForm(); // librería validacion form
 
  const navigate = useNavigate(); // propiedad react para redireccionar
  const [values, setValues] = useState({ // estado para guardar los datos del formulario
    email: "",
    password: "",
  });
  const startLogin = async () => { // funcion para iniciar sesion, (se llama con el handleSumbmit)
  try
  {
    const response = await login (values); // llamada a la funcion login de la api
    saveUser(response.data);
    navigate("/order");
  } catch {
    alert("Usuario y/o contraseña incorrectos"); 
  }  
  }
  const handleChange = (e) => { // funcion para guardar los datos del formulario
    const { target } = e;
    const { name, value } = target;
    console.log(value);
    const newValues = { // nuevo estado con los datos del formulario
      ...values, // estado anterior
      [name]: value, // nuevo valor
    };
    setValues(newValues);  // actualizar el estado
  }
  return ( /* formulario de login */
    <form noValidate className="form-login" onSubmit={handleSubmit(startLogin)}> 
      <input // input para el email
      
        type="email"
        name="email"
        placeholder="Usuario"
        className="email"
        value={values.email}
        {...register("email", { // inicio validacion del formulario
          required:{ 
            value: true, 
            message: "El campo es requerido"
          },
          pattern:{ // validacion de email con expresion regular
            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ,
            message: "El formato no es correcto"
          }
        })}
        onChange={handleChange} // cuando se cambia el valor del input
      /> 
      {errors.email && <span>{errors.email.message}</span> } 
      <input // input para el password
        type="password"
        name="password"
        placeholder="Contraseña"
        className="password"
        value={values.password}
        {...register("password", { // inicio validacion del formulario
          required:{
            value: true,
            message: "El campo es requerido"
          },
    minLength:{ // validacion de longitud minima
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres"

    },
    maxLength:{ // validacion de longitud maxima
      value: 12,
      message: "La contraseña debe tener máximo 12 caracteres"

    }
        })}
        
        onChange={handleChange} // cuando se cambia el valor del input
      />
    {errors.password && <span>{errors.password.message}</span> }
      <button type="submit" className="btn-login">INICIAR SESIÓN</button> 
    </form>
  );
}

export default Login;

// "email":"waiter@foodelicious.com"
// clave 123456