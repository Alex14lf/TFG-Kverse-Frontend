import React, { createContext, useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para verificar la expiración del token
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Hora actual en segundos
      return decoded.exp < currentTime; // Retorna true si el token ha expirado
    } catch (error) {
      return true; // Si ocurre un error al decodificar el token, lo consideramos expirado
    }
  };

  // Al cargar la aplicación, comprobamos si hay un token en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      try {
        // Decodificar el token para obtener los datos del usuario
        const decodedUser = jwt_decode(token);
        setUser(decodedUser); // Guardar los datos del usuario en el estado
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    } else {
      setUser(null); // Si no hay token o el token ha expirado, asegurarse de que no haya usuario.
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función de login
  const login = (token) => {
    localStorage.setItem("token", token);  // Guardar el token en localStorage
    const decodedUser = jwt_decode(token);  // Decodificar el token
    setUser(decodedUser);  // Actualizar el estado con los datos del usuario
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem("token");  // Eliminar el token del localStorage
    setUser(null);  // Limpiar el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
