import React from 'react'
import { Link } from 'react-router-dom'
import './Movies.css'
import MovieCard from '../MovieCard/MovieCard';
const Movies = () => {
  const movies = [
    { id: 1, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/lk4NNdeQrb6zbRSogDSdE6qmjk8.jpg' },
    { id: 2, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
    { id: 3, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
    { id: 4, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
    { id: 5, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
    { id: 6, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/lk4NNdeQrb6zbRSogDSdE6qmjk8.jpg' },
    { id: 7, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
    { id: 8, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
    { id: 9, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
    { id: 10, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
    { id: 11, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/lk4NNdeQrb6zbRSogDSdE6qmjk8.jpg' },
    { id: 12, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
    { id: 13, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
    { id: 14, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
    { id: 15, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
  ];
  return (
    <>
      <section className="billboard">
        <h1 className="billboard__title">Babygirl</h1>
        {/* <img src="https://image.tmdb.org/t/p/original/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg" alt="" className="billboard__poster" /> */}
        <img src="https://image.tmdb.org/t/p/original/hctfNoMpQGfn3VXdBYb9p0P5bT5.jpg" alt="" className="billboard__poster" />
        {/* <img src="https://image.tmdb.org/t/p/original/dWkdmxIkH9y23s9v1PjQFhTGIwo.jpg" alt="" className="billboard__poster" /> */}
        <i className="fa-solid fa-angle-left billboard__arrowl"></i>
        <i className="fa-solid fa-angle-right billboard__arrowr"></i>
        {/* <i className="fa-solid fa-circle-chevron-right"></i>
        <i className="fa-solid fa-square-caret-right"></i> */}
        <Link to="/movies" className="billboard__button">
          <span className="button__span">¡Compra tus entradas!</span>
        </Link>
      </section>
      {/* Movie List Section */}
      <section className="movielist">
        <h1 className="movielist__title">CARTELERA KVERSE</h1>
        <article className="movielist__container">
      {/* Movie Containers */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieId={movie.id}
          title={movie.title}
          genre={movie.genre}
          imageUrl={movie.imageUrl}
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
  )
}

export default Movies
