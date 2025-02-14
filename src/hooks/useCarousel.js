import { useState,useEffect} from 'react';

export const useCarousel = (movies) => {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);

  // Función para avanzar a la siguiente película
  const nextMovie = () => {
    setActiveMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Función para retroceder a la película anterior
  const prevMovie = () => {
    setActiveMovieIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  // Configurar el avance automático de la película
  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie();  // Avanza a la siguiente película
    }, 7000); // Cambia de película cada 5 segundos (5000 ms)

    // Limpiar el intervalo cuando el componente se desmonte o cambie la lista de películas
    return () => clearInterval(interval);
  }, [movies]); // Solo vuelve a ejecutar si las películas cambian


  // Devuelve la película activa y las funciones
  return {
    activeMovie: movies[activeMovieIndex],
    nextMovie,
    prevMovie,
  };
};


