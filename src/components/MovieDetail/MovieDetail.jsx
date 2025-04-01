import React from "react";
import "./MovieDetail.css";
import MovieCard from '../MovieCard/MovieCard';
import { useParams } from "react-router-dom";
import { useOneMovie } from "../../hooks/useOneMovie";
import Loading from "../Loading/Loading";

const MovieDetail = () => {
  const { movieid } = useParams();
  const { movie, loading, error } = useOneMovie(movieid);

  if (loading) return <Loading />;
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

    </>
  );
};

export default MovieDetail;
