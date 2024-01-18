import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from "@react-google-maps/api";
import axios from "axios";

const Mapa = ({ isOpen, handleCloseModal, handleAgregarPunto, puntosControl, setPuntosControl }) => {

  const [poligonos, setPoligonos] = useState([]);

  const containerStyle = {
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center"
  };

  const center = {
    lat: 10.465,
    lng: -66.976,
  };

  const handleMapClick = (e) => {
    if (!e) return; // Agrega esta línea para manejar el caso en el que e sea null

    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    handleAgregarPunto({ lat, lng });
  };

  const handleCrearPoligono = () => {
    const puntos = puntosControl.map((punto) => ({
      lat: punto.lat,
      lng: punto.lng,
    }));

    // Agregar el polígono a la lista de polígonos
    setPoligonos([puntos]);
  };

  const handleBorrarPoligono = () => {
    // Borrar el polígono anteriormente dibujado
    setPoligonos([]);
    setPuntosControl([]);

    // Borrar los puntos de control
    // handleAgregarPunto({ lat: 0, lng: 0 });
  };

  useEffect(() => {
    if (puntosControl.length >= 3)
      handleCrearPoligono();
  }, [puntosControl]);

  return (
    isOpen && (
      <div className=".mapa">
        <h2>Zona de seguridad</h2>
        <LoadScript googleMapsApiKey="AIzaSyBcVP__otz3wxYvWgx_LUJp0DOJSDKhDV4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
          >
            {/* Muestra los marcadores en las posiciones almacenadas */}
            {puntosControl.map((punto, index) => (
              <Marker key={index} position={punto} />
            ))}

            {/* Dibuja las líneas de los polígonos */}
            {poligonos.map((puntos, index) => (
              <Polyline
                key={index}
                path={puntos}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            ))}

            {/* Dibuja los polígonos */}
            {poligonos.map((puntos, index) => (
              <Polygon
                key={index}
                paths={puntos}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <div className="modal-buttons">
          <button className="cancelar-button" onClick={handleCloseModal}>
            Cerrar
          </button>
          <button className="crear-poligono-button" onClick={handleBorrarPoligono}>
            Borrar polígono
          </button>
        </div>
      </div>
    )
  );
};

export default Mapa;
