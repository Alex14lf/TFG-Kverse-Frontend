import React from 'react'
import './Cinemas.css'
import banner from '../../assets/images/cinemas.png'; 
const Cinemas = () => {
    return (
        <>
            <section className="banner__cinemas">
                <img src={banner} alt="" className="banner__imgc" />
            </section>
        </>
    )
}

export default Cinemas
