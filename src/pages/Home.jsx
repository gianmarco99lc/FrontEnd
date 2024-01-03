import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [Admins, setAdmins] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    Username: "",
    correo: "",
    password: "",
  });
  const [AdminEditando, setAdminEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState({
    username: "",
    correo: "",
    password: "",
  });

  //GET
  
  // Este efecto se ejecutará una vez, cuando el componente se monte
  useEffect(() => {
    // Llamada a la API para obtener todos los admins
    fetch("http://localhost:8080/cmcapp-backend-1.0/api/v1/admin/todos")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error al obtener datos de la API:", error));
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente


  const handleAgregarAdmin = () => {
    setModalVisible(true);
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = {
      username: "",
      correo: "",
      password: "",
    };

    // Validaciones para el Username
    if (nuevoAdmin.Username.length < 4 || nuevoAdmin.Username.length > 20) {
      errors.username =
        "El Username debe tener entre 4 y 20 caracteres.";
      isValid = false;
    }

    // Validaciones para el Correo
    if (nuevoAdmin.correo.length < 4 || nuevoAdmin.correo.length > 40) {
      errors.correo = "El Correo debe tener entre 4 y 40 caracteres.";
      isValid = false;
    }

    // Validaciones para el Password
    if (nuevoAdmin.password.length < 4 || nuevoAdmin.password.length > 15) {
      errors.password = "El Password debe tener entre 4 y 15 caracteres.";
      isValid = false;
    }

    setErrorMensaje(errors);
    return isValid;
  };

  const handleGuardarAdmin = async () => {
    if (!validateInputs()) {
      // No guardar si hay errores de validación
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/cmcapp-backend-1.0/api/v1/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _username: nuevoAdmin.Username,
          _correo: nuevoAdmin.correo,
          _password: nuevoAdmin.password,
        }),
      });

      if (!response.ok) {
        // Si la llamada a la API no fue exitosa, muestra un mensaje de alerta con el código de respuesta
        const errorMensaje = `Error al realizar la solicitud: ${response.status} - ${response.statusText}`;
        alert(errorMensaje);
        return;
      }

      // La llamada a la API fue exitosa, agrega el nuevo administrador al estado local
      const newAdmin = await response.json();
      setAdmins([...Admins, { ...newAdmin, id: Admins.length + 1 }]);
      setNuevoAdmin({
        Username: "",
        correo: "",
        password: "",
      });
      setAdminEditando(null);
      setModalVisible(false);
      setErrorMensaje(""); // Limpia cualquier mensaje de error anterior

    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al realizar la solicitud. Consulta la consola para más detalles.");
    }
  

    // setAdmins([...Admins, { ...nuevoAdmin, id: Admins.length + 1 }]);
    // setNuevoAdmin({
    //   Username: "",
    //   correo: "",
    //   password: "",
    // });
    setModalVisible(false);
  };

  const handleActualizarAdmin = () => {
    if (!validateInputs()) {
      // No actualizar si hay errores de validación
      return;
    }

    setAdmins((prevAdmins) =>
      prevAdmins.map((Admin) =>
        Admin.id === AdminEditando.id
          ? { ...Admin, ...nuevoAdmin }
          : Admin
      )
    );
    setNuevoAdmin({
      Username: "",
      correo: "",
      password: "",
    });
    setAdminEditando(null);
    setModalVisible(false);
  };

  const handleEditarAdmin = (Admin) => {
    setAdminEditando(Admin);
    setNuevoAdmin({
      Username: Admin.Username,
      correo: Admin.correo,
      password: Admin.password || "",
    });
    setModalVisible(true);
  };

  const handleEliminarAdmin = (id) => {
    setAdmins((prevAdmins) =>
      prevAdmins.filter((Admin) => Admin.id !== id)
    );
  };

  const handleCancelar = () => {
    setModalVisible(false);
    setNuevoAdmin({ Username: "", correo: "", password: "" });
    setAdminEditando(false);
    setErrorMessages({
      username: "",
      correo: "",
      password: "",
    });
  };

  const emptyData = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="contenedor-usuarios">
      <div className="titulo">
        <h1></h1>
      </div>
      <div>
        <Button variant="contained" onClick={handleAgregarAdmin}>
          Agregar
        </Button>
      </div>
      <div>
        <table className="tabla-admins">
          <thead>
            <tr>
              <th>Username</th>
              <th>Correo</th>
              <th>Password</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Admins.map((Admin) => {
              emptyData.pop();
              return (
                <tr key={Admin.id}>
                  <td>{Admin.Username}</td>
                  <td>{Admin.correo}</td>
                  <td>{Admin.password}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditarAdmin(Admin)}
                    >
                      Editar
                    </button>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleEliminarAdmin(Admin.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
            {emptyData.map((id) => (
              <tr key={id}>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{AdminEditando ? "Editar Admin" : "Nuevo Admin"}</h2>
            <label>Username:</label>
            <input
              type="text"
              value={nuevoAdmin.Username}
              onChange={(e) =>
                setNuevoAdmin({ ...nuevoAdmin, Username: e.target.value })
              }
            />
            <div className="error-message">{errorMensaje.username}</div>
            <label>Correo:</label>
            <input
              type="text"
              value={nuevoAdmin.correo}
              onChange={(e) =>
                setNuevoAdmin({ ...nuevoAdmin, correo: e.target.value })
              }
            />
            <div className="error-message">{errorMensaje.correo}</div>
            <label>Password:</label>
            <input
              type="password"
              value={nuevoAdmin.password}
              onChange={(e) =>
                setNuevoAdmin({ ...nuevoAdmin, password: e.target.value })
              }
            />
            <div className="error-message">{errorMensaje.password}</div>
            <div className="modal-buttons">
              <button
                className={
                  AdminEditando ? "actualizar-button" : "guardar-button"
                }
                onClick={
                  AdminEditando
                    ? handleActualizarAdmin
                    : handleGuardarAdmin
                }
              >
                {AdminEditando ? "Actualizar" : "Guardar"}
              </button>
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

export default Home;
