import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button
} from '@mui/material';
import axios from "axios";
import Mapa from './Mapa';

function Conexion() {

  const [selectedUser, setSelectedUser] = useState("-1");
  const [isConexionLoading, setIsConexionLoading] = useState(false);
  const [conexiones, setConexiones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isUsuariosLoading, setUsuariosLoading] = useState(true);
  const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
  const [conexionSeleccionada, setConexionSeleccionada] = useState({});

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    console.log("ID seleccionado", selectedUserId);
    setSelectedUser(usuarios.find( usuario => usuario.id === parseInt(selectedUserId) ).id);
  };

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const usuarios = await axios.get("/${import.meta.env.VITE_APP_SERVER_URL}/usuarios/findAll");
        setUsuarios( usuarios.data.response.map( usuario => ({nombre: usuario._Nombre, id: usuario.id})) )
      } catch(error) {
        console.log(error);
      } finally {
        setUsuariosLoading(false);
      }
    }

    obtenerUsuarios();

  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      try {
        if (conexiones.length > 0)
          console.log("Hey", conexiones);
        setIsConexionLoading(true);
        const conexionResponse = await axios.get(`/${import.meta.env.VITE_APP_SERVER_URL}/conexion/usuario/${selectedUser}`);
        console.log("Conexion", conexionResponse);
        if (conexionResponse.data.response !== null) {
          setConexiones(conexionResponse.data.response.map( conexion => {
            const fechaHora = new Date(conexion._fecha)
            return {
              id: conexion.id,
              nombre: conexion._usuario._Nombre,
              tipoUsuario: conexion._usuario.usuarioTypeDto.name,
              latitud: conexion._latitud,
              longitud: conexion._longitud,
              fecha: `${fechaHora.getDate()}/${fechaHora.getMonth() + 1}/${fechaHora.getFullYear()} ${fechaHora.getHours()}:${fechaHora.getMinutes()}`
            }
          } ));
        } else {
          setConexiones([]);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setIsConexionLoading(false);
      }
    }

    obtenerData();

  }, [selectedUser]);

  const handleMostrarUbicacion = (e, index) => {
    e.preventDefault();
    console.log(conexiones[index]);
    setConexionSeleccionada(conexiones[index]);
    setMostrarUbicacion(true);
  }

  return (
    <div>
      {
        isUsuariosLoading ? <CircularProgress /> :
        <select value={selectedUser.toString()} onChange={handleUserChange}>
          <option value="-1">Seleccione una opción</option>
          {
            ...usuarios.map( usuario => (
              <option value={usuario.id.toString()}>{usuario.nombre}</option>
            ) )
          }
        </select>
      }
      {
        mostrarUbicacion &&
        <div className="modal">
          <div className="modal-content contenedor">
            <div>
              <Mapa
                  isOpen={mostrarUbicacion}
                  handleCloseModal={() => setMostrarUbicacion(false)}
                  // handleAgregarPunto={handleAgregarPunto}
                  puntosControl={[{lat: conexionSeleccionada.latitud, lng: conexionSeleccionada.longitud}]}
                  // setPuntosControl={setPuntosControl}
                  // zonaSeguridadSeleccionada={zonaSeguridadSeleccionada}
                  borrarPoligono={true}
                  parapeto={true}
                />
            </div>
          </div>

        </div>
      }
      {
        isConexionLoading ? <CircularProgress /> :
        conexiones.length === 0 ? <span>Seleccione un usuario</span> :
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo de usuario</TableCell>
                <TableCell>Latitud</TableCell>
                <TableCell>Longitud</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conexiones.map((conexion, index) => (
                <TableRow key={index}>
                  <TableCell>{conexion.nombre}</TableCell>
                  <TableCell>{conexion.tipoUsuario}</TableCell>
                  <TableCell>{conexion.latitud}</TableCell>
                  <TableCell>{conexion.longitud}</TableCell>
                  <TableCell>{conexion.fecha}</TableCell>
                  <TableCell>
                    <Button variant="text" onClick={(e) => handleMostrarUbicacion(e, index)}>Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  );
}

export default Conexion;
