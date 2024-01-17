import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const Alertas = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const [alertas, setAlertas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [activeAlerta, setActiveAlerta] = useState({});

  const handleVerPuntosControl = (e, index) => {
    e.preventDefault();
    setActiveAlerta(alertas[index]);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const obtenerAlertas = async () => {
      try {
        const alertas = await axios.get(`/api/alertas/findAll`);
        console.log(alertas.data.response);
        setAlertas(alertas.data.response.map(alerta => ({victima: alerta.usuario._Username, tipoAlerta: alerta._tipoAlerta, fechaHora: new Date(alerta._fechaHora), latitud: alerta._latitud, longitud: alerta._longitud})));
      } catch(error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    obtenerAlertas();

  }, []);

  return (
    <div className="contenedor-usuarios">
      <div className="titulo">
        <h1></h1>
      </div>
      <div>
        {
          isLoading ? <CircularProgress /> :
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Víctima</th>
                <th>Tipo de alerta</th>
                <th>Fecha Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                alertas.map( (alerta, index) => (
                  <tr>
                    <td>{alerta.victima}</td>
                    <td>{alerta.tipoAlerta}</td>
                    <td>{`${alerta.fechaHora.getDate()}/${alerta.fechaHora.getMonth() + 1}/${alerta.fechaHora.getFullYear()} ${alerta.fechaHora.getHours()}:${alerta.fechaHora.getMinutes()}`}</td>
                    <td>
                      <Button className="ver-button" onClick={(e) => handleVerPuntosControl(e, index)}>
                        Ver
                      </Button>
                    </td>
                  </tr>
                ) )
              }
              </tbody>
            </table>
          }
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Alerta</h2>
            <p>info alerta</p>
            <div className="modal-buttons">
              <div>
              {
                JSON.stringify(activeAlerta)
              }
              </div>
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
