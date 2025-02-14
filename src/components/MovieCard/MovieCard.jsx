import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className="movie__container">
            <Link to={`/movies/${props.movieId}`} data-discover="true">
                <img className="movie__img" src={props.imageUrl} alt={props.title} />
            </Link>
            <h1 className="movie__title">{props.title}</h1>
            <p className="movie__genre">{props.genre}</p>
        </div>
    );
};

export default MovieCard;
