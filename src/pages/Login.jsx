// Importar los componentes y hooks necesarios
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

// Crear el componente Login
const Login = () => {
  // Usar el hook useForm para manejar el estado y la validación del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Usar el hook useHistory para acceder al historial de navegación
  const history = useHistory();

  // Usar el hook useState para almacenar el estado de error del inicio de sesión
  const [loginError, setLoginError] = useState(null);

  // Definir la función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    // Simular una llamada a una API de autenticación
    // Puedes reemplazar esto con tu propia lógica
    const { email, password } = data;
    const response = await fakeApiCall(email, password);

    // Si la respuesta es exitosa, navegar al menú principal
    if (response.success) {
      history.push('/');
    } else {
      // Si la respuesta es fallida, mostrar el mensaje de error
      setLoginError(response.message);
    }
  };

  // Definir la función que simula una llamada a una API de autenticación
  // Puedes reemplazar esto con tu propia lógica
  const fakeApiCall = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular un usuario y una contraseña válidos
        const validUser = 'user@example.com';
        const validPassword = '123456';

        // Si el email y la contraseña coinciden, devolver una respuesta exitosa
        if (email === validUser && password === validPassword) {
          resolve({ success: true });
        } else {
          // Si el email o la contraseña no coinciden, devolver una respuesta fallida
          resolve({ success: false, message: 'Email o contraseña incorrectos' });
        }
      }, 1000);
    });
  };

  // Retornar el JSX del componente
  return (
    <div className="login">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="error">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Clave</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="error">Este campo es obligatorio</span>}
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {loginError && <p className="error">{loginError}</p>}
    </div>
  );
};

export default Login;
