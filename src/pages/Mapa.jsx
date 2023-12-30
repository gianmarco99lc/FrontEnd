import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Mapa = ({ isOpen, handleCloseModal }) => {
  const containerStyle = {
    width: "100%",
    height: "70%",
  };

  const center = {
    lat: 10.465,
    lng: -66.976,
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Zona de seguridad</h2>
          <LoadScript googleMapsApiKey="AIzaSyBcVP__otz3wxYvWgx_LUJp0DOJSDKhDV4">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
              {/* Agrega componentes adicionales del mapa aquí si es necesario */}
            </GoogleMap>
          </LoadScript>
          <div className="modal-buttons">
            <button className="cancelar-button" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Mapa;
