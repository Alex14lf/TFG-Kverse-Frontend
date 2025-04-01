import React from 'react';
import './CineCard.css';

const CineCard = (props) => {
    return (
        <div className="cine__container">
            <img className="cine__img" src={props.image} alt={props.name} />
            <h1 className="cine__name">{props.name}</h1>
            <p className='cine__description'>Kverse en {props.ciudad}</p>
        </div>
    );
};

export default CineCard;