import React, { useState, useEffect } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { useOneMovie } from "../../hooks/useOneMovie";
import Loading from "../Loading/Loading";

const MAPA_ASIENTOS = [
  { fila: 8, asientos: [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100] },
  { fila: 7, asientos: [71, 72, 73, 74, 75, 76, null, null, 77, 78, 79, 80, 81, 82, 83, 84] },
  { fila: 6, asientos: [57, 58, 59, 60, 61, 62, null, null, 63, 64, 65, 66, 67, 68, 69, 70] },
  { fila: 5, asientos: [43, 44, 45, 46, 47, 48, null, null, 49, 50, 51, 52, 53, 54, 55, 56] },
  { fila: 4, asientos: [29, 30, 31, 32, 33, 34, null, null, 35, 36, 37, 38, 39, 40, 41, 42] },
  { fila: 3, asientos: [null, null, 17, 18, 19, 20, null, null, 21, 22, 23, 24, 25, 26, 27, 28] },
  { fila: 2, asientos: [null, null, 5, 6, 7, 8, null, null, 9, 10, 11, 12, 13, 14, 15, 16] },
  { fila: 1, asientos: [null, null, 1, 2, null, null, null, null, null, null, 3, 4, null, null, null, null] }
];

const MovieDetail = () => {
  const { movieid } = useParams();
  const { movie, loading, error } = useOneMovie(movieid);
  const [showtimes, setShowtimes] = useState([]);
  const [loadingShowtimes, setLoadingShowtimes] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [seleccionados, setSeleccionados] = useState([]); // Asientos seleccionados por el usuario
  const [selectedProjectionId, setSelectedProjectionId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [asientosOcupados, setAsientosOcupados] = useState([]);




  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/v1/cine/showtimes/${movieid}`);
        const data = await response.json();
        const groupedShowtimes = groupShowtimesByDate(data);
        setShowtimes(groupedShowtimes);
      } catch (err) {
        console.error("Error al obtener las proyecciones:", err);
      } finally {
        setLoadingShowtimes(false);
      }
    };

    fetchShowtimes();
  }, [movieid]);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setSelectedHour(null);
  };

  const handleHourSelection = (hour, projectionId) => {
    setSelectedHour(hour);
    setSelectedProjectionId(projectionId);  // Guardamos el ID de la proyección seleccionada
  };

  useEffect(() => {
    const obtenerAsientosOcupados = async () => {
      if (!selectedProjectionId) return;

      try {
        const response = await fetch(`http://localhost:3000/v1/cine/reservaAsientos/${selectedProjectionId}`);
        const data = await response.json();

        console.log("🎟️ Asientos ocupados para la proyección", selectedProjectionId, "=>", data);

        // Asegúrate de adaptar esto al formato que devuelve tu backend
        setAsientosOcupados(data || []);
      } catch (err) {
        console.error("Error al obtener los asientos ocupados:", err);
      }
    };

    obtenerAsientosOcupados();
  }, [selectedProjectionId]);



  const handleSelectSeat = (asientoId, fila, index) => {
    if (asientoId !== null) {
      const nuevoAsiento = { id: asientoId, fila, numero: index + 1 };

      setSeleccionados((prevSeleccionados) => {
        const existe = prevSeleccionados.find((a) => a.id === asientoId);
        if (existe) {
          return prevSeleccionados.filter((a) => a.id !== asientoId);
        } else {
          return [...prevSeleccionados, nuevoAsiento];
        }
      });
    }
  };

  const formatFecha = (fecha) => {
    const dateObj = new Date(fecha);
    const dia = String(dateObj.getDate()).padStart(2, "0");
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const año = String(dateObj.getFullYear()).slice(-2);
    const diaSemana = dateObj.toLocaleDateString("es-ES", { weekday: "long" });

    return {
      display: `${dia}/${mes}/${año}`,
      weekday: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1),
    };
  };

  const groupShowtimesByDate = (showtimes) => {
    return showtimes.reduce((acc, item) => {
      const { date, time, id } = item;  // Asegúrate de tener el `id` aquí
      const { display, weekday } = formatFecha(date);
      const key = `${display}|${weekday}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ time, id });  // Almacena el objeto con `time` e `id`
      return acc;
    }, {});
  };


  const handleReservar = async () => {
    setSuccessMessage(null); // Limpiar mensaje de éxito antes de hacer una nueva reserva
    setErrorMessage(null); // Limpiar mensaje de error antes de hacer una nueva reserva

    if (!isAuthenticated) {
      setShowLoginMessage(true); // Mostrar el mensaje si no está autenticado
      return;
    }

    setShowLoginMessage(false); // Ocultar mensaje si estaba visible de antes

    const token = localStorage.getItem("token");

    if (token && seleccionados.length > 0 && selectedProjectionId) {
      try {
        const decoded = jwt_decode(token);
        const userId = decoded.id || decoded.userId || decoded.sub;

        const response = await fetch('http://localhost:3000/v1/cine/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            usuario_id: userId,
            proyeccion_id: selectedProjectionId,
            asientos: seleccionados,
          }),
        });

        if (!response.ok) {
          throw new Error('Error en la reserva');
        }

        const data = await response.json();

        // Mensaje de éxito
        setSuccessMessage("Reserva realizada con éxito. ¡Disfruta de la película!");

        // Limpiar la selección de asientos después de la reserva
        setSeleccionados([]);
      } catch (error) {
        setSeleccionados([]);
        console.error('Error en la reserva:', error);

        // Mensaje de error
        setErrorMessage('Hubo un error al realizar la reserva. Por favor, inténtalo nuevamente.');
      }
    } else {
      setErrorMessage("Por favor, selecciona al menos un asiento y asegúrate de que la proyección esté seleccionada.");
    }
  };




  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (loading || loadingShowtimes) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  return (
    <>
      <section className="movdet__billboard">
        <img src={movie.cartel} alt={movie.titulo} className="movdet__img" />
      </section>
      <h2 className="info__title">{movie.titulo}</h2>
      <div className="movdet__container">
        <img className="container__img" src={movie.poster} alt="" />
        <div className="containers">
          <div className="container__info">
            <h2 className="info__subtitle">Sinopsis</h2>
            <p className="info__description">{movie.sinopsis}</p>
          </div>
          <div className="container__extra">
            <div className="genero__container">
              <h2 className="info__subtitle">Genero</h2>
              <p className="info__description">{movie.genero}</p>
            </div>
            <div className="duracion__container">
              <h2 className="info__subtitle">Duracion</h2>
              <p className="info__description">{`${Math.floor(movie.duracion / 60)}h ${movie.duracion % 60}m`}</p>
            </div>
            <div className="valoracion__container">
              <h2 className="info__subtitle">Valoracion</h2>
              <p className="info__description">{movie.valoracion}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="proyecciones__container">
        <div className="days__list">
          {Object.keys(showtimes).map((key) => {
            const [display, weekday] = key.split("|");
            return (
              <div
                key={key}
                onClick={() => handleDaySelection(key)}
                className={`day__button ${selectedDay === key ? "active" : ""}`}
              >
                {display}
                <br />
                {weekday}
              </div>
            );
          })}
        </div>

        {selectedDay && (
          <div className="hours__list">
            {showtimes[selectedDay].map((projection) => (
              <div
                key={projection.id}
                onClick={() => handleHourSelection(projection.time, projection.id)}
                className={`hour__button ${selectedHour === projection.time ? "active" : ""}`}
              >
                <p className="hour__p">{projection.time}</p>
              </div>
            ))}
          </div>
        )}


        {selectedHour && (
          <>
            <div className="mapa__asientos">
              <table className="mapa__asientos__tabla">
                <thead>
                  <tr>
                    {/* Primer celda vacía en la esquina superior izquierda */}
                    <td className="mapa-asientos__celda"></td>
                    {/* Generar los números de los asientos en la parte superior */}
                    {MAPA_ASIENTOS[0].asientos.map((_, index) => (
                      <td key={`header-seat-${index}`} className="mapa-asientos__numero-asiento">
                        {index + 1}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MAPA_ASIENTOS.map((fila) => (
                    <tr key={fila.fila}>
                      {/* Número de la fila en la columna izquierda */}
                      <td className="mapa-asientos__numero-fila">{fila.fila}</td>
                      {/* Los asientos de la fila */}
                      {fila.asientos.map((asiento, index) => (
                        <td
                          key={asiento !== null ? asiento : `vacio-${fila.fila}-${index}`}
                          onClick={() => {
                            if (!asientosOcupados.includes(asiento)) {
                              handleSelectSeat(asiento, fila.fila, index);
                            }
                          }}

                          className={`mapa__asientos__asiento ${asiento === null
                            ? "mapa-asientos__asiento--vacio"
                            : asientosOcupados.includes(asiento)
                              ? "mapa-asientos__asiento--ocupado"
                              : seleccionados.some((a) => a.id === asiento)
                                ? "mapa-asientos__asiento--seleccionado"
                                : "mapa-asientos__asiento--disponible"
                            }`}

                        >
                          {asiento ? (
                            <i
                            className="mapa-asientos__asiento-icono fa-solid fa-couch fa-2xs"
                            style={{
                              color: asientosOcupados.includes(asiento)
                                ? "#ff4c4c" 
                                : seleccionados.some((a) => a.id === asiento)
                                  ? "#4cffb2" 
                                  : "#ffffff" 
                            }}
                          ></i>
                          
                          ) : (
                            ""
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pantalla__container">
                <p className="pantalla__text">PANTALLA</p>
              </div>
            </div>
            <div className="mapa-asientos__mensaje">
              {seleccionados.length > 0 ? (
                <p className="mapa-asientos__texto">
                  Has seleccionado los asientos:
                  {seleccionados.map((a) => ` Fila ${a.fila}, Asiento ${a.numero}`).join(" | ")}
                </p>
              ) : (
                <>
                  {/* Solo mostrar los mensajes de éxito o error si no hay asientos seleccionados */}
                  {successMessage && (
                    <p className="success-message">{successMessage}</p>
                  )}

                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}

                  <p className="mapa-asientos__texto">No has seleccionado ningún asiento aún.</p>
                </>

              )}
            </div>
            {seleccionados.length > 0 && (
              <>
                <div className="mapa-asientos__reservar-container">
                  <button className="mapa-asientos__reservar-boton" onClick={handleReservar}>
                    Reservar
                  </button>
                </div>

                {showLoginMessage && (
                  <p className="mensaje-login">Debes iniciar sesión para poder hacer una reserva.</p>
                )}
              </>
            )}

          </>
        )}
      </section>
    </>
  );
};

export default MovieDetail;
