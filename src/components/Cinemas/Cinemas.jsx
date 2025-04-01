import React from 'react'
import './Cinemas.css'
import banner from '../../assets/images/cinemas.png'; 
import CineCard from '../CineCard/CineCard';
const Cinemas = () => {
    return (
        <>
            <section className="banner__cinemas">
                <img src={banner} alt="" className="banner__imgc" />
            </section>
            <h1 className="cinemas__title">CINES</h1>
            <div className="cines__container">
                <CineCard
                image="https://www.cinesa.es/media/43epcp4q/as-cancelas.jpg?width=1200&height=630&v=1d8e96c6d60cd70"
                name="LA GAVIA"
                ciudad="Vallecas (Madrid)"
                />
                <CineCard
                image="https://produccionaudiovisual.com/wp-content/uploads/2020/06/sala-de-cine-1.jpg"
                name="TORRE TRIANA"
                ciudad="Sevilla"
                />
                <CineCard
                image="https://diariodevigo.com/wp-content/uploads/2025/02/vigo-estrenara-la-primera-sala-de-cine-4d-e-motion-de-galicia-2025-02-09-vigo-estrenara-la-primera-sala-de-cine-4d-e-motion-de-galicia.webp"
                name="DIAGONAL"
                ciudad="Barcelona"
                />
                <CineCard
                image="https://www.adslzone.net/app/uploads-adslzone.net/2021/10/Samsung-onyx.jpg"
                name="BONAIRE"
                ciudad="Valencia"
                />
                <CineCard
                image="https://s1.elespanol.com/2024/02/28/madrid/comunidad/836177142_240337396_1706x640.jpg"
                name="ALCAZAR"
                ciudad="Toledo"
                />
            </div>
        </>
    )
}

export default Cinemas
