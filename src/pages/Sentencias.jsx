import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Sentencias = () => {
  const [sentencias, setSentencias] = useState([]);
  const [victimas, setVictimas] = useState([]);
  const [agresores, setAgresores] = useState([]);
  const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(true);
  const [nuevaSentencia, setNuevaSentencia] = useState({
    victima: "",
    agresor: "",
    tiemposControl: "",
    distanciasAlejamiento: "",
    zonasSeguridad: [],
  });
  const [sentenciaEditando, setSentenciaEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalZonasVisible, setModalZonasVisible] = useState(false);
  const [zonasSeguridad, setZonasSeguridad] = useState([]);
  const [zonaSeguridadActual, setZonaSeguridadActual] = useState({
    punto1: "",
    punto2: "",
    punto3: "",
  });

  const handleAgregarSentencia = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const usuarios = await axios.get("https://crucial-healthy-dinosaur.ngrok-free.app/cmcapp-backend-1.0/api/v1/usuarios/findAll");
      usuarios.data.response.map( usuario => usuario.usuarioTypeDto.id === 1 ? setAgresores( prev => [...prev, {id: usuario.id, nombre: usuario._Nombre}] ) : setVictimas( prev => [...prev, {id: usuario.id, nombre: usuario._Nombre}] ))
      setIsLoadingUsuarios(false);
    }

    obtenerUsuarios();

  }, []);

  const handleGuardarSentencia = () => {
    setSentencias([
      ...sentencias,
      { ...nuevaSentencia, id: sentencias.length + 1 },
    ]);
    // setNuevaSentencia({
    //   victima: "",
    //   agresor: "",
    //   tiemposControl: "",
    //   distanciasAlejamiento: "",
    //   zonasSeguridad: [],
    // });
    setModalVisible(false);
  };

  const handleActualizarSentencia = () => {
    setSentencias((prevSentencias) =>
      prevSentencias.map((sentencia) =>
        sentencia.id === sentenciaEditando.id
          ? { ...sentencia, ...nuevaSentencia }
          : sentencia
      )
    );
    setNuevaSentencia({
      victima: "",
      agresor: "",
      tiemposControl: "",
      distanciasAlejamiento: "",
      zonasSeguridad: [],
    });
    setSentenciaEditando(null);
    setModalVisible(false);
  };

  const handleEditarSentencia = (sentencia) => {
    setSentenciaEditando(sentencia);
    setNuevaSentencia({
      victima: sentencia.victima || "",
      agresor: sentencia.agresor || "",
      tiemposControl: sentencia.tiemposControl || "",
      distanciasAlejamiento: sentencia.distanciasAlejamiento || "",
      zonasSeguridad: sentencia.zonasSeguridad || [],
    });
    setModalVisible(true);
  };

  const handleEliminarSentencia = (id) => {
    setSentencias((prevSentencias) =>
      prevSentencias.filter((sentencia) => sentencia.id !== id)
    );
  };

  const handleCancelar = () => {
    setModalVisible(false);
    setNuevaSentencia({
      victima: "",
      agresor: "",
      tiemposControl: "",
      distanciasAlejamiento: "",
      zonasSeguridad: [],
    });
    setSentenciaEditando(null);
  };

  const handleCrearZonas = () => {
    setModalZonasVisible(true);
  };

  const handleGuardarZonas = () => {
    setZonasSeguridad([...zonasSeguridad, zonaSeguridadActual]);
    setNuevaSentencia({
      ...nuevaSentencia,
      zonasSeguridad: [...nuevaSentencia.zonasSeguridad, zonaSeguridadActual],
    });
    setZonaSeguridadActual({ punto1: "", punto2: "", punto3: "" });
    setModalZonasVisible(false);
  };

  const handleVerZonas = (zonas) => {
    setZonasSeguridad(zonas);
    setModalZonasVisible(true);
  };

  const handleCancelarZonas = () => {
    setModalZonasVisible(false);
    setZonaSeguridadActual({ punto1: "", punto2: "", punto3: "" });
  };

  const emptyData = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleNuevaSentencia = (e, tipo) => {
    e.preventDefault();
    
    

    if (tipo === "victima") {
      
      setNuevaSentencia({
        ...nuevaSentencia,
        victima: victimas.find( victima => victima.id === parseInt(e.target.value) ).id.toString()
      });
    }

    if (tipo === "agresor"){
      setNuevaSentencia({
        ...nuevaSentencia,
        agresor: agresores.find( agresor => agresor.id === parseInt(e.target.value) ).id.toString()
      });
    }

    if (tipo === "tiemposControl"){
      setNuevaSentencia({
        ...nuevaSentencia,
        tiemposControl: e.target.value
      });
    }

    if (tipo === "distanciasAlejamiento") {
      setNuevaSentencia({
        ...nuevaSentencia,
        distanciasAlejamiento: e.target.value
      });
    }

    if (tipo === "zonasSeguridad") {
      setNuevaSentencia({
        ...nuevaSentencia,
        zonasSeguridad: e.target.value
      });
    }

  }

  useEffect(() => {

    console.log("nueva sentencia", nuevaSentencia)

  },[nuevaSentencia]) 

  return (
    <div className="contenedor-sentencias">
      <div className="titulo">
        <h1></h1>
      </div>
      <div>
        <Button variant="contained" onClick={handleAgregarSentencia}>
          Agregar
        </Button>
      </div>
      <div>
        <table className="tabla-sentencias">
          <thead>
            <tr>
              <th>Víctima</th>
              <th>Agresor</th>
              <th>Tiempos de Control</th>
              <th>Distancias de Alejamiento</th>
              <th>Zona de Seguridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sentencias.map((sentencia) => (
              <tr key={sentencia.id}>
                <td>{victimas.find(victima => victima.id === parseInt(sentencia.victima)).nombre}</td>
                <td>{agresores.find(agresor => agresor.id === parseInt(sentencia.agresor)).nombre}</td>
                <td>{sentencia.tiemposControl}</td>
                <td>{sentencia.distanciasAlejamiento}</td>
                <td>
                  {sentencia.zonasSeguridad.length > 0 ? (
                    <button
                      className="ver-button"
                      onClick={() => handleVerZonas(sentencia.zonasSeguridad)}
                    >
                      Ver
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => handleCrearZonas(sentencia)}
                    >
                      Crear
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditarSentencia(sentencia)}
                  >
                    Editar
                  </button>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleEliminarSentencia(sentencia.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
            {emptyData.map((id) => (
              <tr key={id}>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* Agrega el contenido necesario */}</td>
                <td>{/* No hay acciones en las filas vacías */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {sentenciaEditando ? "Editar sentencia" : "Nueva sentencia"}
            </h2>
            <label>Víctima:</label>
            {
              isLoadingUsuarios ? <CircularProgress /> :
              <select
                name="victima"
                value={nuevaSentencia.victima}
                onChange={(e) => handleNuevaSentencia(e, "victima")}
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
            <label>Agresor:</label>
            {
              isLoadingUsuarios ? <CircularProgress /> :
              <select
                name="agresor"
                value={nuevaSentencia.agresor}
                onChange={(e) => handleNuevaSentencia(e, "agresor")}
                  // setNuevaSentencia({
                  //   ...nuevaSentencia,
                  //   // agresor: parseInt(e.target.value),
                  //   agresor: nuevaSentencia.agresor
                  // })
                // }
              >
                <option value="" disabled selected>Selecciona una opción</option>
                {
                  agresores.map( agresor => (<option value={agresor.id.toString()}>{agresor.nombre}</option>) )
                }
              </select>
            }

            {/* Otros campos del formulario */}
            <label>Tiempos de Control:</label>
            <input
              type="text"
              value={nuevaSentencia.tiemposControl}
              onChange={(e) => handleNuevaSentencia(e, "tiemposControl")}
              //   setNuevaSentencia({
              //     ...nuevaSentencia,
              //     tiemposControl: e.target.value,
              //   })
              // }
            />

            <label>Distancias de Alejamiento:</label>
            <input
              type="text"
              value={nuevaSentencia.distanciasAlejamiento}
              onChange={(e) => handleNuevaSentencia(e, "distanciasAlejamiento")}
            />

            <div className="modal-buttons">
              <button
                className={
                  sentenciaEditando ? "actualizar-button" : "guardar-button"
                }
                onClick={
                  sentenciaEditando
                    ? handleActualizarSentencia
                    : handleGuardarSentencia
                }
              >
                {sentenciaEditando ? "Actualizar" : "Guardar"}
              </button>
              <button className="cancelar-button" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalZonasVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Zonas de Seguridad</h2>
            {zonasSeguridad.map((zona, index) => (
              <div key={index}>
                <p>
                  Punto {index + 1}: {zona.punto1}, {zona.punto2}, {zona.punto3}
                </p>
              </div>
            ))}
            <div className="modal-buttons">
              <button className="cancelar-button" onClick={handleCancelarZonas}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sentencias;
