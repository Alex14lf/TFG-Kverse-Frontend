import React from 'react'
import './Experiences.css'
import banner from '../../assets/images/experiences.jpg';
import ExperienceCard from '../ExperienceCard/ExperienceCard';
const Experiences = () => {
    return (
        <>
            <section className="banner__experience">
                <img src={banner} alt="" className="banner__imge" />
            </section>
            <h1 className="experiencias__title">EXPERIENCIAS</h1>
            <div className="experiencias__container">
                <ExperienceCard
                image='https://www.cinesa.es/media/t0ufh3g5/sala-premium-isense-cinesa.jpg'
                title='ISENSE'
                description='El sonido envolvente de estas salas, una pantalla extragrande, proyector full HD y sus butacas XXL te harán sentir más parte de la película que nunca.'  
                />
                <ExperienceCard
                image='https://www.cinesa.es/media/hozfkyqf/conoce-sala-imax-en-cinesa.jpg'
                title='IMAX'
                description='En IMAX, desde la película hasta la tecnología y el diseño de las salas se han desarrollado y adaptado para hacerte creer que eres uno de los protagonistas.'  
                />
                <ExperienceCard
                image='https://www.cinesa.es/media/1jnfpr1h/xl_1024x420.jpg'
                title='SALA XL'
                description='Las novedosas salas XL son las de más grandes dimensiones del cine, donde podrás disfrutar de las películas como si fueras el protagonista.'  
                />
                <ExperienceCard
                image='https://www.cinesa.es/media/vetbkgfh/cinesa-sala-screenx.jpg'
                title='SCREEN X'
                description='La primera plataforma cinematográfica inmersiva que ofrece a los espectadores una experiencia de visualización de 270 grados.'  
                />
                <ExperienceCard
                image='https://www.cinesa.es/media/iushzgud/descubre-sala-dbox-en-cinesa.jpg'
                title='DBOX'
                description='Prepárate para sentir nuevas emociones y déjate llevar por la inmersión y el movimiento de las butacas DBOX. Una experiencia única.'  
                />
            </div>
           
        </>
    )
}

export default Experiences


