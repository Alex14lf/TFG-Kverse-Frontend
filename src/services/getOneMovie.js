export const getOneMovie = async (movieId) => {
    const response = await fetch(`http://localhost:3000/v1/cine/movies/${movieId}`)
    const data = await response.json()
    return data
}