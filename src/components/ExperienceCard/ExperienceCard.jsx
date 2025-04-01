import React from 'react'
import './ExperienceCard.css'
const ExperienceCard = (props) => {
    return (
        <>
            <div className="experience__container">
                <img src={props.image} className="experience__img" alt={props.title} loading="lazy" />
                <div className="description__container">
                    <h3 className="experience__title">{props.title}</h3>
                    <p className="experience__description">{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default ExperienceCard
