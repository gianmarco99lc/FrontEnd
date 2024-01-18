import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline, Polygon } from "@react-google-maps/api";
import axios from "axios";

const Mapa = ({ isOpen, handleCloseModal, handleAgregarPunto, puntosControl, setPuntosControl, borrarPoligono, parapeto, parapeto2 }) => {

  const [poligonos, setPoligonos] = useState([]);
  const [center, setCenter] = useState({lat: 10.465, lng: -66.976});

  const containerStyle = {
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center"
  };

  useEffect(() => {
    const center = parapeto && setCenter({lat: puntosControl[0].lat, lng: puntosControl[0].lng});

  }, []);


  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setCenter({lat, lng});
    handleAgregarPunto({ lat, lng });
  };

  const handleCrearPoligono = () => {
    console.log("MI MANO", puntosControl);
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

  useEffect(() => {
    if (parapeto === true) {
      handleCrearPoligono();
    }
  }, [])

  return (
    isOpen && (
      <div className=".mapa">
        <h2>{parapeto2 ? "" : parapeto ? "Conexión" : "Zona de seguridad"}</h2>
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
          {
            borrarPoligono === undefined &&
            <button className="crear-poligono-button" onClick={handleBorrarPoligono}>
              Borrar polígono
            </button>
          }
        </div>
      </div>
    )
  );
};

export default Mapa;
