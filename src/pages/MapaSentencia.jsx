import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { point, polygon, booleanPointInPolygon } from '@turf/turf';

export const MapaSentencia = ({ isOpen, handleCloseModal, puntosControl, idVictima, distanciaMinima }) => {

  const [zonasDeSeguridad, setZonasDeSeguridad] = useState([]);
  const [isLoadingZonasDeSeguridad, setIsLoadingZonasDeSeguridad] = useState(true);

  const center = {lat: puntosControl[0].lat, lng: puntosControl[0].lng};

  const containerStyle = {
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center"
  };

  function isCoordinateInsidePolygon(coordinate, polygonPoints) {

    if (!Array.isArray(polygonPoints))
      polygonPoints = [polygonPoints];

    const pointToCheck = point([coordinate.lng, coordinate.lat]);

    const polygonCoordinates = polygonPoints.map( point => [point._longitudX, point._latitudY]);

    polygonCoordinates.push([polygonPoints[0]._longitudX, polygonPoints[0]._latitudY]);

    const polygon2 = polygon([polygonCoordinates]);

    const isInside = booleanPointInPolygon(pointToCheck, polygon2);

    console.log(isInside);

    if (isInside) {
      axios.post(`/api/alertas/insert`, {
        _tipoAlerta: "AGRESOR SE ENCUENTRA DENTRO DE ZONA SEGURA",
        _latitud: coordinate.lat,
        _longitud: coordinate.lng,
        _fechaHora: (new Date()).getTime(),
        usuario: {
        id: idVictima
        },
        id: 5000
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then( response => console.log(response) )
        .catch( error => console.log(error) )
    }

    return isInside;

  }

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

    console.log("Distancia", distancia, distanciaMinima);

    if (distancia <= distanciaMinima) {
      axios.post(`/api/alertas/insert`, {
        _tipoAlerta: "DISTANCIA MÍNIMA EXCEDIDA",
        _latitud: lat2,
        _longitud: lon2,
        _fechaHora: (new Date()).getTime(),
        usuario: {
        id: idVictima
        },
        id: 3000
      })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

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
                  label={index === 0 ? "victima" : "agresor"}
                />
              ))}
                {
                  zonasDeSeguridad.map((zona, index) =>
                    <Polygon
                      key={index}
                      paths={zona.map( coordenada => ({lat: coordenada._latitudY, lng: coordenada._longitudX}) )}
                      options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: isCoordinateInsidePolygon(puntosControl[1], zona) === true ? "#D23C30" : "#263137",
                        fillOpacity: 0.35,
                      }}
                    />
                  )
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
