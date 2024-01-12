import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    username: "",
    correo: "",
    password: "",
    tipoUsuario: "",
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAgregarUsuario = () => {
    setModalVisible(true);
  };

  const handleGuardarUsuario = async () => {
    try {
      setIsLoading(true);

      setUsuarios([...usuarios, { ...nuevoUsuario, id: usuarios.length + 1 }]);

      const respuestaNuevoUsuario = await axios.post("http://localhost:8080/cmcapp-backend-1.0/api/v1/usuarios/insert", {
        _Username: nuevoUsuario.username,
        _Correo: nuevoUsuario.correo,
        _Nombre: nuevoUsuario.nombre,
        usuarioTypeDto: {
        id: nuevoUsuario.tipoUsuario === "victima" ? 2 : 1
        },
        imei: "XXX-YY",
        _Password: nuevoUsuario.password,
        estatus: true,
        docIdentidad: "",
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(respuestaNuevoUsuario);

      setNuevoUsuario({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        tipoUsuario: "",
      });

    } catch(error) {
      console.log(error);
      alert("error interno");
    } finally {
      setIsLoading(false);
    }

    setModalVisible(false);
  };

  const handleActualizarUsuario = () => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === usuarioEditando.id
          ? { ...usuario, ...nuevoUsuario }
          : usuario
      )
    );
    setNuevoUsuario({
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      tipoUsuario: "",
    });
    setUsuarioEditando(null);
    setModalVisible(false);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setNuevoUsuario({
      nombre: usuario.nombre,
      username: usuario.username || "",
      correo: usuario.correo,
      password: usuario.password || "",
      tipoUsuario: usuario.tipoUsuario || "",
    });
    setModalVisible(true);
  };

  const handleEliminarUsuario = (id) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((usuario) => usuario.id !== id)
    );
  };

  const handleCancelar = () => {
    setModalVisible(false); // Oculta el modal al hacer clic en Cancelar
    setNuevoUsuario({ nombre: "", correo: "" }); // Restablece los valores del nuevo usuario
    setUsuarioEditando(false); // Resetea la bandera de usuario editando
  };

  // Crear un array de 10 elementos para representar las filas
  const emptyData = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="contenedor-usuarios">
      <div className="titulo">
        <h1></h1>
      </div>
      <div>
        <Button variant="contained" onClick={handleAgregarUsuario}>
          Agregar
        </Button>
      </div>
      <div>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Password</th>
              <th>Tipo de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => {
                emptyData.pop()
                return (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.password}</td>
                    <td>{usuario.tipoUsuario}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEditarUsuario(usuario)}
                      >
                        Editar
                      </button>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleEliminarUsuario(usuario.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                )
            })}
            {emptyData.map((id) => (
              <tr key={id}>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* No hay acciones en las filas vacías */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{usuarioEditando ? "Editar usuario" : "Nuevo usuario"}</h2>
            <label>Nombre:</label>
            <input
              type="text"
              value={nuevoUsuario.nombre}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
              }
            />
            <label>Username:</label>
            <input
              type="text"
              value={nuevoUsuario.username}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
              }
            />
            <label>Correo:</label>
            <input
              type="text"
              value={nuevoUsuario.correo}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })
              }
            />
            <label>Password:</label>
            <input
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
              }
            />
            <RadioGroup
              aria-label="tipoUsuario"
              name="tipoUsuario"
              value={nuevoUsuario.tipoUsuario}
              onChange={(e) =>
                setNuevoUsuario({
                  ...nuevoUsuario,
                  tipoUsuario: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="victima"
                control={<Radio />}
                label="Víctima"
              />
              <FormControlLabel
                value="agresor"
                control={<Radio />}
                label="Agresor"
              />
            </RadioGroup>
            <div className="modal-buttons">
              {
                isLoading ? <CircularProgress /> :
                <button
                  className={
                    usuarioEditando ? "actualizar-button" : "guardar-button"
                  }
                  onClick={
                    usuarioEditando
                      ? handleActualizarUsuario
                      : handleGuardarUsuario
                  }
                >
                  {usuarioEditando ? "Actualizar" : "Guardar"}
                </button>
              }
              <button className="cancelar-button" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
