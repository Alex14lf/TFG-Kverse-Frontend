import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css';
import MovieCard from '../MovieCard/MovieCard';
import Loading from '../Loading/Loading';
// import Mantenimiento from '../Mantenimiento/Mantenimiento';
import { useCarousel } from '../../hooks/useCarousel';
import { useMovies } from '../../hooks/useMovies';

const Movies = () => {
  const { movies, loading, error} = useMovies();
  const { activeMovie, nextMovie, prevMovie } = useCarousel(movies);

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return <Mantenimiento/>
  // }

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
    </>
  );
};

export default Movies;
