import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Movies from './components/Movies/Movies';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Cinemas from './components/Cinemas/Cinemas';
import Experiences from './components/Experiences/Experiences';
import SignUp from './components/SignUp/SignUp';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar el AuthProvider

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        {/* Aquí estamos envolviendo la app con AuthProvider para que toda la aplicación tenga acceso al contexto */}

        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* La ruta raíz será Layout */}
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Movies />} />
                        <Route path='movies' element={<Movies />} />
                        <Route path="movies/:movieid" element={<MovieDetail />} />
                        <Route path='cinemas' element={<Cinemas />} />
                        <Route path='experiences' element={<Experiences />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='profile' element={<SignUp />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </ErrorBoundary>
);
