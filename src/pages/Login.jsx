import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from "@mui/material";
import { AuthContext } from '../contexts/auth/auth.context';
import axios from 'axios';

const Login = () => {

  const { authState, setAuthentication } = useContext(AuthContext);

  const [form, setForm] = useState({username: "", password: ""})

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      console.log("login", form.username, form.password);

      const response = await axios.get(`/api/admin/username/${form.username}`);

      console.log(response);

      console.log("respuesta", response.data.response);

      const user = response.data.response;

      if (form.username === user._username && form.password === user._password)
        setAuthentication({type: "authenticate", payload: user});
      else
        alert("Credenciales incorrectas");

    }catch(error){
      console.log(error);
      alert("Error interno.");
    } finally{
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm( prev => ({...prev, [e.target.name]: e.target.value}) );
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="form-content" onSubmit={handleLogin}>
        <TextField
          name="username"
          label="Username"
          type="text"
          value={form.username}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          variant="outlined"
          onChange={handleChange}
        />
          {
            isLoading ? <CircularProgress /> :
            <Button type="submit" variant="contained">
              Ingresar
            </Button>
          }
      </form>
    </div>
  );
}

export default Login;
