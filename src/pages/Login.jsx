import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from "@mui/material";
import axios from 'axios';
import { AuthContext } from '../contexts/auth/auth.context';

const Login = () => {

  const { dispatch } = useContext(AuthContext);

  const [form, setForm] = useState({username: "", password: ""})

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.get(`http://localhost:8080/cmcapp-backend-1.0/api/v1/admin/username/${form.username}`);

      console.log("Aquí está la respuesta:", response);

    }catch(error){
      console.log(error);
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
          label="Username"
          type="text"
          value={username}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
            label="Password"
            type="password"
            value={password}
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
