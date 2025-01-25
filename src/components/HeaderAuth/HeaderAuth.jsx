import React from 'react'
import { Link } from 'react-router-dom'
import './HeaderAuth.css'
import logo from '../../assets/images/logowhite.png';

const HeaderAuth = () => {
  return (
    <nav className="nav">
      <div className="nav__containerlogo">
      <Link to="/"><img src={logo} alt="Logo" className="nav__logo" /></Link>
      </div>
      <div className="container__menu">
        {/* <h1 className="nav__title">Kverse</h1> */}
        <Link to="/movies" className="nav__link">Peliculas</Link>
        <Link to="/cinemas" className="nav__link">Cines</Link>
        <Link to="/experiences" className="nav__link">Experiencias</Link>
        <div className="nav__link nav__link-sesion">Iniciar Sesión</div>
        <Link to="/signup" className="nav__link">Registrate</Link>
      </div>
      <div className="nav__icons">
        <div className="nav__sesion">
          <i className="fa-solid fa-user icon__sesion"></i>
        </div>
        <div className="nav__burguer">
          <i className="fa-solid fa-bars icon__menu"></i>
        </div>
      </div>
    </nav>
  )
}

export default HeaderAuth
