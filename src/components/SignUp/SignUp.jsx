import React, { useState } from 'react';
import './SignUp.css';
import banner from '../../assets/images/signup.jpg';

const SignUp = () => {
    // Estado para manejar los errores de los campos
    const [errors, setErrors] = useState({});
    // Estado para manejar el mensaje de éxito
    const [successMessage, setSuccessMessage] = useState("");
    const [generalError, setGeneralError] = useState("");


    // Función para manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Recogemos los valores del formulario
        const formData = {
            email: e.target.email_sign.value,
            dni: e.target.dni_sign.value,
            nombre: e.target.nombre_sign.value,
            apellidos: e.target.apellidos_sign.value,
            telefono: e.target.telefono_sign.value,
            fecha_nacimiento: e.target.fecha_nacimiento_sign.value,
            password: e.target.password_sign.value,
        };

        console.log(formData);  // Verifica que los datos sean correctos

        try {
            const response = await fetch('http://localhost:3000/v1/cine/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Usuario registrado con éxito:", data);
                setSuccessMessage("Usuario registrado con éxito");  // Establecemos el mensaje de éxito
                setErrors({});  // Limpiamos los errores

                // Limpiamos el formulario
                e.target.reset();  // Esto limpiará todos los campos del formulario
            } else {
                if (!response.ok) {
                    console.log("Errores del backend:", data.errors || data.error);
                    setErrors(data.errors || {});  // Esto sigue funcionando para errores por campo
                    setGeneralError(data.error); // Aquí recoges errores generales
                    setSuccessMessage("");  // Limpiamos cualquier mensaje de éxito anterior
                }
            }
        } catch (error) {
            console.error('Error al hacer el registro:', error);
        }
    };

    return (
        <>
            <section className="banner__signup">
                <img src={banner} alt="" className="banner__imgs" />
            </section>
            <div className="container__register">
                <h1 className='container__title'>REGISTRATE EN KVERSE</h1>
                <form className="container__form" onSubmit={handleSubmit}>
                    <label className="form__label" htmlFor="email_sign">Correo Electrónico</label>
                    <input className="form__input" type="email" id="email_sign" name="email_sign" placeholder='Introduce tu email' required />
                    {errors.email && <p className="signup__error">{errors.email}</p>} {/* Mostramos error aquí */}

                    <label className="form__label" htmlFor="dni_sign">DNI</label>
                    <input className="form__input" type="text" id="dni_sign" name="dni_sign" placeholder='Introduce tu DNI' required />
                    {errors.dni && <p className="signup__error">{errors.dni}</p>} {/* Mostramos error aquí */}

                    <div className="containerflex">
                        <div className="containercolumn">
                            <label className="form__label" htmlFor="nombre_sign">Nombre</label>
                            <input className="form__input" type="text" id="nombre_sign" name="nombre_sign" placeholder='Introduce tu nombre' required />
                            {errors.nombre && <p className="signup__error">{errors.nombre}</p>} {/* Mostramos error aquí */}
                        </div>
                        <div className="containercolumn">
                            <label className="form__label" htmlFor="apellidos_sign">Apellidos</label>
                            <input className="form__input" type="text" id="apellidos_sign" name="apellidos_sign" placeholder='Introduce tus apellidos' required />
                            {errors.apellidos && <p className="signup__error">{errors.apellidos}</p>} {/* Mostramos error aquí */}
                        </div>
                    </div>

                    <div className="containerflex">
                        <div className="containercolumn">
                            <label className="form__label" htmlFor="telefono_sign">Teléfono</label>
                            <input className="form__input" type="text" id="telefono_sign" name="telefono_sign" placeholder='Introduce tu teléfono' required />
                            {errors.telefono && <p className="signup__error">{errors.telefono}</p>} {/* Mostramos error aquí */}
                        </div>
                        <div className="containercolumn">
                            <label className="form__label" htmlFor="fecha_nacimiento_sign">Fecha Nacimiento</label>
                            <input className="form__input" type="date" id="fecha_nacimiento_sign" name="fecha_nacimiento_sign" placeholder='Introduce tu fecha de nacimiento' required />
                            {errors.fecha_nacimiento && <p className="signup__error">{errors.fecha_nacimiento}</p>} {/* Mostramos error aquí */}
                        </div>
                    </div>

                    <label className="form__label" htmlFor="password_sign">Contraseña</label>
                    <input className="form__input" type="password" id="password_sign" name="password_sign" placeholder='Introduce tu contraseña' required />
                    {errors.password && <p className="signup__error">{errors.password}</p>} {/* Mostramos error aquí */}

                    {/* Si el mensaje de éxito está presente, lo mostramos*/}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {generalError && <p className="signup__error">{generalError}</p>}


                    <button className="form__button" type="submit">Registrate</button>
                </form>


            </div>
        </>
    );
};

export default SignUp;
