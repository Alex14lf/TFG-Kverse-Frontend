export const getMovies = async () => {
    const response = await fetch(`http://localhost:3000/v1/cine/movies/active`)
    const data = await response.json()
    return data
}

