import { useAppContext } from './context/appContext.js'
import { IMAGE_URL } from './API.js'
import Movie from './Movie.js'

export default function Favorites() {

    const { favorites, selectMovie, setOpen } = useAppContext()

    return (
        <div>
            <Movie/>
            {/*posters container*/}
            <div className='flex justify-center'>
                <div className='container grid gap-10 mt-8 mb-8 text-center xl:grid-cols-4 md:grid-cols-2'>
                    {favorites.map((movie) => (
                        <div
                        key={movie.id}
                        className='bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-cyan-700 duration-300 cursor-pointer rounded-xl shadow-lg shadow-neutral-300 pb-2 space-y-2'
                        onClick={() => selectMovie(movie) && setOpen(true)}>
                            <img className='sm:h-100 rounded-t-xl' src={`${IMAGE_URL + movie.poster_path}`} alt={`${movie.title}`}/>
                            <div className='font-body-open-sans font-semibold sm:text-xs md:text-xl'>{movie.title}</div>
                            <div className='font-body-open-sans sm:text-xs md:text-xl pb-4'>{movie.release_date.slice(0,4)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}