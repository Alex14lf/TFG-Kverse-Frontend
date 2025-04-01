import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './HeaderUnauth.css'
import logo from '../../assets/images/logowhite.png';

const HeaderUnauth = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del menú

  // Alternar visibilidad del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Alternar visibilidad del modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      document.body.classList.add('modal-open'); // Evita el scroll
    } else {
      document.body.classList.remove('modal-open'); // Permite el scroll
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__containerlogo">
          <Link to="/"><img src={logo} alt="Logo" className="nav__logo" /></Link>
        </div>
        <div className={`container__menu ${isOpen ? 'active' : ''}`}>
          {/* <h1 className="nav__title">Kverse</h1> */}
          <Link to="/movies" className="nav__link" onClick={toggleMenu}>Peliculas</Link>
          <Link to="/cinemas" className="nav__link" onClick={toggleMenu}>Cines</Link>
          <Link to="/experiences" className="nav__link" onClick={toggleMenu}>Experiencias</Link>
          <div className="nav__link nav__link-sesion" onClick={() => { toggleMenu(); toggleModal(); }}>Iniciar Sesión</div>
          <Link to="/signup" className="nav__link" onClick={toggleMenu}>Registrate</Link>
          <div className="nav__x" onClick={toggleMenu}>
            <i className="fa-solid fa-x icon__close"></i>
          </div>
        </div>
        <div className="nav__icons">
          <div className="nav__burguer" onClick={toggleMenu}>
            <i className="fa-solid fa-bars icon__menu"></i>
          </div>
        </div>
      </nav>
      <div className={`modalsesion ${isModalVisible ? 'display' : ''}`}>
        <div className="modalsesion__container">
          <div className="modal__x" onClick={toggleModal}>
            <i className="fa-solid fa-x icon__close"></i>
          </div>
          <div className="container__sesion">
            <h1 className='container__title'>Iniciar Sesión</h1>
            <form className="container__form">
              <label className="form__label" htmlFor="email">Correo Electrónico</label>
              <input className="form__input" type="email" id="email" name="email" required />
              <label className="form__label" htmlFor="password">Contraseña</label>
              <input className="form__input" type="password" id="password" name="password" required />
              <button className="form__button" type='submit'>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderUnauth
