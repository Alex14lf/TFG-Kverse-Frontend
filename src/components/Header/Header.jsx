import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logowhite.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del menú
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado del modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado (si hay token en localStorage)
  const isAuthenticated = !!localStorage.getItem("token");

  // Alternar visibilidad del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Alternar visibilidad del modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      document.body.classList.add('modal-open'); // Evita el scroll
    } else {
      document.body.classList.remove('modal-open'); // Permite el scroll
      setEmail("");      // Limpiar input de email
      setPassword("");   // Limpiar input de contraseña
      setError("");      // Limpiar mensaje de error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const response = await fetch("http://localhost:3000/v1/cine/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Convertimos la respuesta a JSON

      if (!response.ok) {
        throw new Error(data.message || "Usuario o contraseña incorrectos"); // Mensaje del backend o mensaje genérico
      }

      localStorage.setItem("token", data.token);
      navigate('/profile'); // Redirigir al área personal

      toggleModal(); // Cerrar modal al iniciar sesión
    } catch (err) {
      console.error("Error en login:", err.message);
      setError(err.message); // Mostrar error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/'); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__containerlogo">
          <Link to="/"><img src={logo} alt="Logo" className="nav__logo" /></Link>
        </div>
        <div className={`container__menu ${isOpen ? 'active' : ''}`}>
          <Link to="/movies" className="nav__link" onClick={toggleMenu}>Peliculas</Link>
          <Link to="/cinemas" className="nav__link" onClick={toggleMenu}>Cines</Link>
          <Link to="/experiences" className="nav__link" onClick={toggleMenu}>Experiencias</Link>
          
          {/* Mostrar "Área Personal" y "Cerrar sesión" si está autenticado */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav__link" onClick={toggleMenu}>Área Personal</Link>
              <div className="nav__link nav__link-sesion" onClick={handleLogout}>Cerrar sesión</div>
            </>
          ) : (
            <>
              <div className="nav__link nav__link-sesion" onClick={() => { toggleMenu(); toggleModal(); }}>Iniciar Sesión</div>
              <Link to="/signup" className="nav__link" onClick={toggleMenu}>Registrate</Link>
            </>
          )}

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

      {/* Modal de login */}
      <div className={`modalsesion ${isModalVisible ? "display" : ""}`}>
        <div className="modalsesion__container">
          <div className="modal__x" onClick={toggleModal}>
            <i className="fa-solid fa-x icon__close"></i>
          </div>
          <div className="container__sesion">
            <h1 className="container__title">Iniciar Sesión</h1>
            <form className="container__form" onSubmit={handleSubmit}>
              <label className="form__label" htmlFor="email">Usuario</label>
              <input className="form__input" type="email" id="email" name="email" placeholder="Introduce tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label className="form__label" htmlFor="password">Contraseña</label>
              <input className="form__input" type="password" id="password" name="password" placeholder="Introduce tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <p className="form__error">{error}</p>}
              <button className="form__button" type="submit">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
