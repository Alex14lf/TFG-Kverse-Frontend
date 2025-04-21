import React, { useEffect, useState } from 'react';
import TicketCard from '../TicketCard/TicketCard'; 
import './PersonalArea.css'
import banner from '../../assets/images/Personalarea.jpg';

const PersonalArea = () => {
    const [tickets, setTickets] = useState([]);

    // Obtener el usuario_id desde el localStorage (o decodificando un token si es un JWT)
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.id || decoded.userId || decoded.sub;
        if (token) {
            return userId;  // Esto dependerá de cómo guardes el usuario_id en tu token
        }
        return null;
    };

    useEffect(() => {
        const fetchTickets = async () => {
            const userId = getUserIdFromToken();
            if (userId) {
                const response = await fetch(`http://localhost:3000/v1/cine/tickets/${userId}`);
                const data = await response.json();
                setTickets(data);  // Asumimos que la respuesta es un array de tickets
            }
        };

        fetchTickets();
    }, []);

    // Función para manejar la anulación de una reserva
    const handleAnularReserva = async (idReserva) => {
        const response = await fetch(`http://localhost:3000/v1/cine/reservas/${idReserva}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            // Si la respuesta es exitosa, actualizamos los tickets
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id_reserva !== idReserva));
            console.log('Reserva anulada con éxito');
        } else {
            console.log('Error al anular la reserva');
        }
    };

    return (
        <>
            <section className="banner__experience">
                <img src={banner} alt="" className="banner__imge" />
            </section>
            <h1 className="experiencias__title">MIS RESERVAS</h1>
            <div className='tickets__container'>
                {tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <TicketCard
                            key={ticket.id_reserva}
                            pelicula={ticket.pelicula}
                            sala={ticket.sala}
                            fechaProyeccion={ticket.fecha_proyeccion}
                            asientos={ticket.asientos}
                            onAnular={() => handleAnularReserva(ticket.id_reserva)}  // Pasamos la función de anular como prop
                        />
                    ))
                ) : (
                    <p>No tienes reservas.</p>
                )}
            </div>

        </>

    );
};

export default PersonalArea;

