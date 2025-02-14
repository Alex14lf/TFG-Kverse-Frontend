import { useState, useEffect } from 'react';
import { getMovies } from '../services/getMovies';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error al cargar las películas:", error);
      }
    };

    fetchMovies();
  }, []);
  
  return { movies };
  
};
