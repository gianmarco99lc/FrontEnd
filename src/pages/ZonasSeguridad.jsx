import React, { useState } from "react";
import Button from "@mui/material/Button";
import Mapa from "./Mapa";

const ZonasSeguridad = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleVerPuntosControl = () => {
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
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
            <p>aqui se muestra el mapa</p>
            <Mapa isOpen={modalVisible} handleCloseModal={handleCerrarModal} />
            
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
