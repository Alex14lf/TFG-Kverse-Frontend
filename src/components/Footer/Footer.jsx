import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="madeby">
                <p className='madeby__title'>Made by Alejandro López</p>
            </div>
            <div className="footer__networks">
                <a href=""><i className="fa-brands fa-instagram"></i></a>
                <a href=""><i className="fa-brands fa-facebook"></i></a>
                <a href=""><i className="fa-brands fa-tiktok"></i></a>
            </div>

            {/* <div className="modal__buy">
                <h1 className="modal__title">Compra tus entradas</h1>
            </div> */}
        </>
    )
}

export default Footer
