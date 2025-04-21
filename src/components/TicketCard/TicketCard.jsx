import React from 'react';
import './TicketCard.css';

const TicketCard = ({ pelicula, sala, fechaProyeccion, asientos, onAnular }) => {
    // Convertir la fecha de proyección a un objeto Date
    const fecha = new Date(fechaProyeccion);

    // Formatear la fecha y la hora de la proyección
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const horaFormateada = fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Comprobar si la fecha de proyección es mayor que la fecha actual (es decir, si la proyección está en el futuro)
    const isReservable = new Date() < fecha; // Si la fecha de proyección es mayor que la actual, se puede anular

    return (
        <div className="ticket__card">
            <div>
                <h3 className='ticket__title'>{pelicula}</h3>
                <p className='ticket__sala'>{sala}</p>
                <p className='ticket__fecha'>{fechaFormateada}</p>
                <p className='ticket__hora'>{horaFormateada}</p>

                <div className='ticket__asientos'>
                    <h4 className='asientos__title'>Asientos:</h4>
                    <ul className='asientos__list'>
                        {asientos.map((asiento, index) => (
                            <li className='asiento__item' key={index}>Fila {asiento.fila}, Número {asiento.numero}</li>
                        ))}
                    </ul>
                </div>

            </div>
            {/* Si la proyección es futura, mostramos el botón para anular */}
            {isReservable && (
                <button className='ticket__anular' onClick={onAnular}>Anular Reserva</button>
            )}
        </div>
    );
};

export default TicketCard;
