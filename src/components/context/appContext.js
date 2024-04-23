import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../API.js'
import { API_KEY } from '../API.js'

const AppContext = createContext(null)

export const useAppContext = () => {
    
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('AppContext must be within appContextProvider')
    }
    return context
}

export default function AppContextProvider({ children }) {

    const [movie, setMovie] = useState({ title: 'Loading Movies' })
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [open, setOpen] = useState(false)
    const [cast, setCast] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalResults, setTotalResults] = useState('0')

    //petición GET a la API
     const fetchMovies = async(searchKey) => {
        const type = searchKey ? 'search' : 'discover'
        const {data: { results }} = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
            api_key: API_KEY,
            query: searchKey
        }
        })
        const {data} = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
            api_key: API_KEY,
            query: searchKey
        }})
        setTotalResults(data.total_results)
        setMovies(results)
        setMovie(results[0])
        if(results.length) {
            await fetchMovie(results[0].id)
        }
    }

    //petición GET a la API para seleccionar solo una película
    const fetchMovie = async(id) => {
        const {data} = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: 'credits'
            }
        })
        const newCast = []
        if (data.credits && data.credits.cast) {
            data.credits.cast.forEach(element => {newCast.push(element.name)})
        }
        setCast(newCast ? newCast : data.credits.cast[0])
        setMovie(data)
    }

    //petición GET a la API para paginación
    const fetchPage = async(pageNumber) => {
        const type = searchKey ? 'search' : 'discover'
        const {data} = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
                page: pageNumber
            }    
        })
        setTotalResults(data.total_results)
        setMovies(data.results)
    }

    //función para seleccionar una película
    const selectMovie = async(movie) => {
        fetchMovie(movie.id)
        setMovie(movie)
    }

    //función para buscar películas
    const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchKey)
    }

    //función para agregar una película a la sección de favoritos
    const addToFavorites = (movie) => {
        const oldFavorites = [...favorites]
        const newFavorites = oldFavorites.concat(movie)
        setFavorites(newFavorites)
    }

    //función para eliminar una película de la sección de favoritos
    const removeFromFavorites = (id) => {
        const oldFavorites = [...favorites]
        const newFavorites = oldFavorites.filter((movie) => movie.id !== id)
        setFavorites(newFavorites)
    }

    useEffect(() => {
        fetchMovies()
        fetchPage()
    },[])

    return (
        <AppContext.Provider value={{ currentPage, setCurrentPage, fetchPage, totalResults, cast, movie, movies, open, setOpen, setSearchKey, searchMovies, selectMovie, favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </AppContext.Provider>
    )
}