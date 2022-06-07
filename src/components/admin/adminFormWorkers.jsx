import "../css/adminFormWorkers.scss";
import { useState } from "react";
import { login, saveUser, getUser } from "../../providers/UserProvider";
import { useForm } from "react-hook-form"; // librería para validacion de formulario
import { Alert } from "reactstrap";
import { Form } from "react-bootstrap";

const AdminFormWorkers = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" }); // librería validacion form

  const [hasError, setHasError] = useState("");
  const [values, setValues] = useState({
    // estado para guardar los datos del formgitulario
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const startLogin = async (e) => {
    e.preventDefault();
    // funcion para iniciar sesion, (se llama con el handleSumbmit)
    try {
      const response = await login(values); // llamada a la funcion login de la api
      saveUser(response.data);
    } catch {
      setHasError("Usuario y/o contraseña no encontrado");
    }
  };
  const handleChange = (e) => {
    // funcion para guardar los datos del formulario
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      // nuevo estado con los datos del formulario
      ...values, // estado anterior
      [name]: value, // nuevo valor
    };
    setValues(newValues); // actualizar el estado
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const style = {
    color: "white",
  };

  return (
    /* formulario de registro */
    <form noValidate className="form-workers" onSubmit={handleSubmit}>
      <div>
        <Form.Label htmlFor="name" visuallyHidden>
          name
        </Form.Label>
        <input
          id="name"
          type="name"
          name="name"
          placeholder="Nombre"
          className="name-worker"
          value={values.name}
          onChange={handleChange} // cuando se cambia el valor del input
          data-testid="name-worker"
        />
        </div>
         <div>
        <Form.Label htmlFor="name" visuallyHidden>
          email
        </Form.Label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="email-worker"
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
          data-testid="email-worker"
        />
        {errors.email && <span style={style}>{errors.email.message}</span>}
      </div>
      <div>
        <Form.Label htmlFor="password" visuallyHidden>
          password
        </Form.Label>
        <input
          id="password" // input para el password
          type="password"
          name="password"
          placeholder="Contraseña"
          className="password-worker"
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
          data-testid="password-worker"
        />
        {errors.password && (
          <span style={style}>{errors.password.message}</span>
        )}
      </div>

      <div>
      <Form.Label htmlFor="password" visuallyHidden>
          role
        </Form.Label>
        <input
          id="role" // input para el password
          type="name"
          name="role"
          placeholder="Rol"
          className="role-worker"
          value={values.role}
          onChange={handleChange} // cuando se cambia el valor del input
          data-testid="role-worker"
          />
      </div>
      
      <button type="submit" className="btn-register" onClick={startLogin}>
        REGISTRAR
      </button>
      {hasError && (
        <Alert data-testid="register-error-message">{hasError}</Alert>
      )}
    </form>
  );
};

export default AdminFormWorkers;
