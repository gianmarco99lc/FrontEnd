import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import { Polyline } from "@react-google-maps/api";
import axios from "axios";

export const MapaSentencia = ({ isOpen, handleCloseModal, puntosControl, idVictima }) => {

  const [zonasDeSeguridad, setZonasDeSeguridad] = useState([]);
  const [isLoadingZonasDeSeguridad, setIsLoadingZonasDeSeguridad] = useState(true);

  const center = {lat: puntosControl[0].lat, lng: puntosControl[0].lng};

  const containerStyle = {
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center"
  };

  useEffect(() => {
    const obtenerZonas = async () => {
      try {
        const coordenadasDeZonas = await axios.get(`/api/coordenadas/todos`);
        const zonasDeSeguridadDeUsuario = coordenadasDeZonas.data.response.filter( coordenada => coordenada._zona_segura.usuario.id === idVictima );

        const agrupados = {};

        zonasDeSeguridadDeUsuario.forEach(objeto => {
          const id = objeto._zona_segura.id;

          if (!agrupados[id]) {
            agrupados[id] = [];
          }

          agrupados[id].push(objeto);
        });

        const resultado = Object.values(agrupados);
        setZonasDeSeguridad(resultado);
      } catch(error) {
        console.log(error);
      } finally {
        setIsLoadingZonasDeSeguridad(false);
      }
    }

    obtenerZonas();

  }, []);

  function calcularDistancia(lat1 = puntosControl[0].lat, lon1  = puntosControl[0].lng, lat2  = puntosControl[1].lat, lon2  = puntosControl[1].lng) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = convertirARadianes(lat2 - lat1);
    const dLon = convertirARadianes(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(convertirARadianes(lat1)) *
        Math.cos(convertirARadianes(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c * 1000;

    return distancia;
  }

  function convertirARadianes(grados) {
    return (grados * Math.PI) / 180;
  }

  return (
    isOpen &&
      isLoadingZonasDeSeguridad ? <CircularProgress /> :
      <div className=".mapa">
        <h2>Mapa sentencias</h2>
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
          <LoadScript googleMapsApiKey="AIzaSyBcVP__otz3wxYvWgx_LUJp0DOJSDKhDV4">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              {/* Muestra los marcadores en las posiciones almacenadas */}
              {puntosControl.map((punto, index) => (
                <Marker
                  key={index}
                  position={punto}
                  // icon={{
                  //   path: typeof window !== 'undefined' && window.google && window.google.maps ? window.google.maps.SymbolPath.CIRCLE : '',
                  //   options: {fillColor: index === 0 ? 'blue' : 'red'},
                  //   fillOpacity: 1,
                  //   strokeWeight: 0,
                  //   scale: 8
                  // }}
                  label={index === 0 ? "victima" : "agresor"}
                />
              ))}
                {
                  zonasDeSeguridad.map((zona, index) => {
                    const zonaSeguridad = zona.map(coordenada => {
                      const pathCoordenada = { lat: coordenada._latitudY, lng: coordenada._longitudX };
                      return (
                        <Polyline
                          key={index}
                          path={[pathCoordenada]}
                          options={{
                            strokeColor: "#FF0000",
                            strokeOpacity: 1,
                            strokeWeight: 2
                          }}
                        />
                      );
                    });

                    console.log("La zona mi mano", zonaSeguridad);

                    return zonaSeguridad;
                  })
                }
            </GoogleMap>
          </LoadScript>
          <div>
            <span>Distancia entre puntos: <strong>{calcularDistancia().toFixed(2)} metros</strong></span>
          </div>
        </div>
        <div className="modal-buttons">
          <button className="cancelar-button" onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    )
}
