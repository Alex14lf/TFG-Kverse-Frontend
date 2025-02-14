// Este servicio puede ser útil si las películas vienen de una API o si tienes lógica adicional.
// export const getMovies = () => {
//     return [
//         { id: 1, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg' },
//         { id: 2, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
//         { id: 3, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
//         { id: 4, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
//         { id: 5, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
//         { id: 6, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/lk4NNdeQrb6zbRSogDSdE6qmjk8.jpg' },
//         { id: 7, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
//         { id: 8, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
//         { id: 9, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
//         { id: 10, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
//         { id: 11, title: 'Smile 2', genre: 'Terror', imageUrl: 'https://image.tmdb.org/t/p/original/lk4NNdeQrb6zbRSogDSdE6qmjk8.jpg' },
//         { id: 12, title: 'Jaws', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/1zfxOqu3Z0dFHWagzBQAaGJfHDZ.jpg' },
//         { id: 13, title: 'The Conjuring', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/jivUhECegXI3OYtPVflWoIDtENt.jpg' },
//         { id: 14, title: 'A Quiet Place In The Hoods', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/3BLaHhBRWCHjJHJaBPn1LJhLpzj.jpg' },
//         { id: 15, title: 'Scream', genre: 'Horror', imageUrl: 'https://image.tmdb.org/t/p/original/337MqZW7xii2evUDVeaWXAtopff.jpg' },
//     ];
// };


export const getMovies = async () => {
    const response = await fetch(`http://localhost:3000/v1/cine/cartelera`)
    const data = await response.json()
    return data
}