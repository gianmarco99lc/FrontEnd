import React, { useState } from "react";
import Button from "@mui/material/Button";

const Alertas = () => {
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
              <th>Alerta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Puedes mapear tu data aquí si la tienes */}
            <tr>
              <td>Sentencia 1</td>
              <td>Víctima A</td>
              <td>Alerta 1</td>
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
            <h2>Alerta</h2>
            <p>info alerta</p>
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

export default Alertas;
