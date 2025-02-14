import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import MovieCard from '../MovieCard/MovieCard';
import Loading from '../Loading/Loading';
import { useCarousel } from '../../hooks/useCarousel';
import { useMovies } from '../../hooks/useMovies';

const Movies = () => {
  const { movies, loading } = useMovies();
  console.log(movies)
  const { activeMovie, nextMovie, prevMovie } = useCarousel(movies);

  // Si no hay películas, mostrar un mensaje de error
  if (!movies || movies.length === 0) {
    return <Loading/>;
  }

  return (
    <>
      <section className="billboard">
        <h1 className="billboard__title">{activeMovie.titulo}</h1>
        <img src={activeMovie.cartel} alt={activeMovie.titulo} className="billboard__poster" />
        <i className="fa-solid fa-angle-left billboard__arrowl" onClick={prevMovie}></i>
        <i className="fa-solid fa-angle-right billboard__arrowr" onClick={nextMovie}></i>
        <Link to={`/movies/${activeMovie.id_api}`} className="billboard__button">
          <span className="button__span">¡Compra tus entradas!</span>
        </Link>
      </section>

      {/* Movie List Section */}
      <section className="movielist">
        <h1 className="movielist__title">CARTELERA KVERSE</h1>
        <article className="movielist__container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id_api}
              movieId={movie.id_api}
              title={movie.titulo}
              genre={movie.genero}
              imageUrl={movie.poster}
            />
          ))}
        </article>
      </section>

      {/* Modal Section */}
      <div className="modalsesion">
        <div className="modalsesion__container">
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
    </>
  );
};

export default Movies;
