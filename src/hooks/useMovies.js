import { useState, useEffect } from "react";
import { getMovies } from "../services/getMovies";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovies();

        if (data && data.length === 0) {
          setError("No hay películas disponibles en este momento.");
        } else {
          setMovies(data);
        }
      } catch (error) {
        console.error("Error al cargar las películas:", error);
        if (error.message.includes("Failed to fetch")) {
          setError("No se pudo conectar al servidor. Verifica tu conexión o que el backend esté funcionando.");
        } else {
          setError("Hubo un problema al cargar las películas. Intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
