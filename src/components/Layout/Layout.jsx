import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import './Layout.css'
import HeaderUnauth from '../HeaderUnauth/HeaderUnauth'
import Footer from '../Footer/Footer'

const Layout = () => {
    // const location = useLocation();
    // Comprobar si la ruta actual requiere el header con position absolute
    // const isAbsoluteHeader = location.pathname === '/' || location.pathname === '/some-specific-route'; 

    return (
        <>
            {/* <header className={`header ${isAbsoluteHeader ? 'header__absolute' : 'header'}`}> */}
            <header className='header'>
                {/* Importamos el componente Header correspondiente */}
                <HeaderUnauth />
            </header>
            <main className='main'>
                {/* Aqui iran los compenentes que esten establecidos en cada ruta, ya que seran un sustitutivo de outlet. */}
                <Outlet />
            </main>
            <footer className='footer'>
                {/* Importamos el componente Footer. */}
                <Footer/>
            </footer>
        </>
    )
}

export default Layout