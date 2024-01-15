import React, { useState } from 'react';
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function Conexion() {
  const [selectedUser, setSelectedUser] = useState('');
  const [conexiones, setConexiones] = useState([]);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);

    // Aquí puedes realizar la lógica para obtener las conexiones filtradas por usuario utilizando el ID seleccionado
    // Puedes hacer una llamada a la API, utilizar una función o cualquier otro método para obtener los datos

    // Ejemplo de datos de conexiones para mostrar en la tabla
    const conexionesData = [
      {
        nombre: 'Conexión 1',
        tipoUsuario: 'Tipo 1',
        latitud: 123.456,
        longitud: 789.012,
        fecha: '2022-01-01',
        acciones: 'Acción 1',
      },
      {
        nombre: 'Conexión 2',
        tipoUsuario: 'Tipo 2',
        latitud: 789.012,
        longitud: 123.456,
        fecha: '2022-02-02',
        acciones: 'Acción 2',
      },
    ];

    setConexiones(conexionesData);
  };

  return (
    <div>
      <Select value={selectedUser} onChange={handleUserChange}>
        <option value="">Seleccionar usuario</option>
        {/* Opciones del select */}
      </Select>

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
                <TableCell>{conexion.acciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Conexion;