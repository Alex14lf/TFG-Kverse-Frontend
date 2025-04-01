import { useState, useEffect } from "react";
import { getOneMovie } from "../services/getOneMovie";

export const useOneMovie = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getOneMovie(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error al cargar la película:", error);
        setError("No se pudo cargar la información de la película.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  return { movie, loading, error };
};
