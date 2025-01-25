import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Movies from './components/Movies/Movies';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Cinemas from './components/Cinemas/Cinemas';
import Experiences from './components/Experiences/Experiences';
import SignUp from './components/SignUp/SignUp';

createRoot(document.getElementById('root')).render(
    //Creacion de las rutas
    <BrowserRouter>
        <Routes>
            {/* La ruta raiz sera layout */}
            <Route path='/' element={<Layout />}>
                <Route index element={<Movies />} />
                <Route path='movies' element={<Movies />} />
                <Route path="movies/:movieid" element={<MovieDetail />} />
                <Route path='cinemas' element={<Cinemas />} />
                <Route path='experiences' element={<Experiences />} />
                <Route path='signup' element={<SignUp />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
