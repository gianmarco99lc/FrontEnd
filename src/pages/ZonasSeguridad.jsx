import React, { useState } from "react";
import Button from "@mui/material/Button";
import Mapa from "./Mapa";

const ZonasSeguridad = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [puntosControl, setPuntosControl] = useState([]);
  const [coordenadasInput, setCoordenadasInput] = useState({ lat: 0, lng: 0 });

  const handleVerPuntosControl = () => {
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  const handleAgregarPunto = (coordenadas) => {
    // Agrega el nuevo punto de control a la lista
    setPuntosControl([...puntosControl, coordenadas]);

    // Actualiza el estado para mostrar las coordenadas en el input
    setCoordenadasInput(coordenadas);
  };

  return (
    <div className="contenedor-usuarios">
      <div className="titulo">
        <h1></h1>
      </div>
      <div>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Sentencia</th>
              <th>Víctima</th>
              <th>Agresor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Puedes mapear tu data aquí si la tienes */}
            <tr>
              <td>Sentencia 1</td>
              <td>Víctima A</td>
              <td>Agresor B</td>
              <td>
                <Button className="ver-button" onClick={handleVerPuntosControl}>
                  Ver
                </Button>
              </td>
            </tr>
            {/* Más filas aquí */}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Zona de seguridad</h2>
            <p>Aquí se muestra el mapa</p>
            <Mapa
              isOpen={modalVisible}
              handleCloseModal={handleCerrarModal}
              handleAgregarPunto={handleAgregarPunto}
            />

            {/* Muestra las coordenadas en un input */}
            <div>
              <label>Coordenadas:</label>
              <input
                type="text"
                value={`Latitud: ${coordenadasInput.lat}, Longitud: ${coordenadasInput.lng}`}
                readOnly
              />
            </div>

            {/* Muestra la lista de puntos de control */}
            <h3>Puntos de control:</h3>
            <ul>
              {puntosControl.map((punto, index) => (
                <li key={index}>Latitud: {punto.lat}, Longitud: {punto.lng}</li>
              ))}
            </ul>

            <div className="modal-buttons">
              <button className="cancelar-button" onClick={handleCerrarModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonasSeguridad;
