import React, { useEffect, useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import Mapa from "./Mapa";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ZonasSeguridad = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [agregarModal, setAgregarModal] = useState(false);
  const [puntosControl, setPuntosControl] = useState([]);
  const [nuevaZona, setNuevaZona] = useState({nombreNuevaZona: ""});
  const [coordenadasInput, setCoordenadasInput] = useState({ lat: 0, lng: 0 });
  const [isCreandoNuevaZona, setIsCreandoNuevaZona] = useState(false);
  const [zonasDeSeguridad, setZonasDeSeguridad] = useState([]);
  const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(true);
  const [isLoadingZonasDeSeguridad, setIsLoadingZonasDeSeguridad] = useState(true);
  const [victimas, setVictimas] = useState([]);
  const [victimaSeleccionada, setVictimaSeleccionada] = useState(null);
  const [zonaSeguridadSeleccionada, setZonaSeguridadSeleccionada] = useState({});
  const [isGuardandoCoordenadas, setIsGuardandoCoordenadas] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const usuarios = await axios.get("${import.meta.env.VITE_APP_SERVER_URL}/usuarios/findAll");
        usuarios.data.response.map( usuario => usuario.usuarioTypeDto.id === 2 && setVictimas( prev => [...prev, {id: usuario.id, nombre: usuario._Nombre}] ));
      } catch(error) {
        console.log(error);
      } finally {
        setIsLoadingUsuarios(false);
      }
    }
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const obtenerZonasDeSeguridad = async () => {
      if (isLoadingZonasDeSeguridad) {
        try {
          const zonasDeSeguridad = await axios.get("${import.meta.env.VITE_APP_SERVER_URL}/zonas/findAll");
          setZonasDeSeguridad(zonasDeSeguridad.data.response.map( zonaDeSeguridad => ({...zonaDeSeguridad, nombre: zonaDeSeguridad._nombre, victima: zonaDeSeguridad.usuario._Nombre}) ))
        } catch(error) {
          console.log(error);
        } finally {
          setIsLoadingZonasDeSeguridad(false);
        }
      }
    }

    obtenerZonasDeSeguridad();

  }, [isLoadingZonasDeSeguridad]);

  const handleVerPuntosControl = async (e, index) => {
    e.preventDefault();
    setPuntosControl([]);
    setZonaSeguridadSeleccionada( zonasDeSeguridad[index] );
    const coordenadas = await axios.get("${import.meta.env.VITE_APP_SERVER_URL}/coordenadas/todos");
    if (coordenadas.data.response !== null) {
      const puntosControl = coordenadas.data.response.filter( puntoControl => puntoControl._zona_segura.id === zonasDeSeguridad[index].id );
      puntosControl.map( puntoControl => setPuntosControl(prev => [...prev, {lat: puntoControl._latitudY ,lng: puntoControl._longitudX}]) );
    }

    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  const handleAgregarModal = () => {
    setAgregarModal(true);
  };

  const handleAgregarPunto = (coordenadas) => {
    // Agrega el nuevo punto de control a la lista
    setPuntosControl([...puntosControl, coordenadas]);

    // Actualiza el estado para mostrar las coordenadas en el input
    setCoordenadasInput(coordenadas);
  };

  const handleEliminarPunto = (index) => {
    const nuevaLista = puntosControl.filter((_, i) => i !== index);
    setPuntosControl(nuevaLista);
  };

  const handleNuevo = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    e.preventDefault();
    setNuevaZona( prev => ({...prev, [e.target.name]: e.target.value}) );
  }

  const handleGuardarZona = async (e) => {
    e.preventDefault();
    try {
      setIsCreandoNuevaZona(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/zonas/insert`, {
        _nombre: nuevaZona.nombreNuevaZona,
        usuario: {
          id: parseInt(victimaSeleccionada),
        }
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      setIsLoadingZonasDeSeguridad(true);
    } catch(error) {
      console.log(error);
    } finally {
      setIsCreandoNuevaZona(false);
    }
  }

  const handleSeleccionUsuario = (e) => {
    e.preventDefault();
    setVictimaSeleccionada(e.target.value);
  }

  const guardarCoordenadas = async (e) => {
    e.preventDefault();
    try {
      setIsGuardandoCoordenadas(true);
      console.log("Punto de control", puntosControl);
      console.log("Zona de seguridad seleccionada", zonaSeguridadSeleccionada);
      await postearCoordenadas(0);
    } catch(error) {
      console.log(error);
    } finally {
      setIsGuardandoCoordenadas(false);
    }
  }

  const postearCoordenadas = async (iteration) => {
    try {
      console.log(puntosControl.length, iteration);

      if (iteration < puntosControl.length)
        await postearCoordenadas(iteration + 1);
      else
        return;

      const response = await axios.post("${import.meta.env.VITE_APP_SERVER_URL}/coordenadas", {
        _latitudY: puntosControl[iteration].lat,
        _longitudX: puntosControl[iteration].lng,
        _zona_segura: {
          id: zonaSeguridadSeleccionada.id
        }
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Respuesta del posteo", response);
    } catch(error) {
      console.log("Error del posteo", error);
    }
  }

  return (
    <div className="contenedor-usuarios">
      {/* <div className="titulo">
        <h1></h1>
      </div> */}
      <Button variant="contained" style={{width: "100px"}} onClick={handleAgregarModal}>Agregar</Button>
      <div className="">
        {
          isLoadingZonasDeSeguridad ? <CircularProgress /> :
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Víctima</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                zonasDeSeguridad.map( (zonaDeSeguridad, index) => (
                  <tr>
                    <td>{zonaDeSeguridad.nombre}</td>
                    <td>{zonaDeSeguridad.victima}</td>
                    <td>
                      <Button className="ver-button" onClick={(e) => handleVerPuntosControl(e, index)}>
                        Ver
                      </Button>
                    </td>
                  </tr>
                ) )
              }
              {/* Más filas aquí */}
            </tbody>
          </table>
        }
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content contenedor">
            <div>
              <Mapa
                isOpen={modalVisible}
                handleCloseModal={handleCerrarModal}
                handleAgregarPunto={handleAgregarPunto}
                puntosControl={puntosControl}
                setPuntosControl={setPuntosControl}
                zonaSeguridadSeleccionada={zonaSeguridadSeleccionada}
                borrarPoligono={true}
              />
            </div>
            <div>
              <div>
                <div>
                  <span>Zona de seguridad: <strong>{zonaSeguridadSeleccionada.nombre}</strong></span>
                </div>
                <h2>Coordenadas:</h2>
                <input
                  type="text"
                  value={`Latitud: ${coordenadasInput.lat}`}
                  readOnly
                />
                <input
                  type="text"
                  value={`Longitud: ${coordenadasInput.lng}`}
                  readOnly
                />
              </div>

              <div>
                <button
                  className="agregar-punto-button"
                  onClick={() => handleAgregarPunto(coordenadasInput)}
                >
                  Agregar Punto
                </button>
              </div>

              <div className="tabla-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Latitud</th>
                      <th>Longitud</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {puntosControl.map((punto, index) => (
                      <tr key={index}>
                        <td>{punto.lat}</td>
                        <td>{punto.lng}</td>
                        <td>
                          {/* <button onClick={() => handleEliminarPunto(index)}>
                          Eliminar
                        </button> */}
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleEliminarPunto(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                {
                  puntosControl.length >= 4 &&
                  isGuardandoCoordenadas ? <CircularProgress /> :
                  <Button onClick={guardarCoordenadas}>Guardar</Button>
                }
                </div>
              </div>
            </div>
            <div className="modal-buttons"></div>
          </div>
        </div>
      )}
      {agregarModal && (
        <div className="modal">
          <div className="modal-content contenedor" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div>
              <div>
                <h2>Nombre de la nueva zona:</h2>
                <input
                  type="text"
                  name="nombreNuevaZona"
                  value={nuevaZona.nombreNuevaZona}
                  onChange={handleChange}
                />
              </div>
              <label>Víctima:</label>
            {
              isLoadingUsuarios ? <CircularProgress /> :
              <select
                name="victima"
                value={victimaSeleccionada}
                onChange={handleSeleccionUsuario}
                //   setNuevaSentencia({
                //     ...nuevaSentencia,
                //     // victima: parseInt(e.target.value),
                //     victima: nuevaSentencia.victima
                //   })
                // }
              >
                <option value="" disabled selected>Selecciona una opción</option>
                {
                  victimas.map( victima => (<option value={victima.id.toString()}>{victima.nombre}</option>) )
                }
                {/* <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option> */}
                {/* Agrega más opciones según sea necesario */}
              </select>
            }
              <div style={{marginTop: "50px"}}>
              {
                isCreandoNuevaZona ? <CircularProgress /> :
                <Button variant="contained" onClick={handleGuardarZona}>Guardar zona</Button>
              }
              </div>
              <div style={{marginTop: "20px"}}>
                <Button variant="contained" color="error" onClick={() => setAgregarModal(false)}>Cerrar</Button>
              </div>
            </div>
            <div className="modal-buttons"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonasSeguridad;
