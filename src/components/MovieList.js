import { useAppContext } from './context/appContext.js'
import { IMAGE_URL } from './API.js'
import Pagination from './Pagination.js'

export default function MovieList() {

    const { totalResults, movies, selectMovie, setOpen } = useAppContext()

    return (
        <div>
            <div className='flex justify-center flex-col items-center'>
                {/*posters container*/}
                <div className='container grid gap-10 mt-10 mb-10 text-center xl:grid-cols-4 md:grid-cols-2'>
                    {movies.map((movie) => (
                        <div
                        key={movie.id}
                        className='bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-sky-500 duration-300 cursor-pointer rounded-xl shadow-lg shadow-neutral-300 pb-2 space-y-2'
                        onClick={() => selectMovie(movie) && setOpen(true)}>
                            <img className='w-full h-5/6 sm:h-100 rounded-t-xl' src={`${IMAGE_URL + movie.poster_path}`} alt={`${movie.title}`}/>
                            <div className='font-body-open-sans font-semibold sm:text-xs md:text-xl'>{movie.title}</div>
                            <div className='font-body-open-sans sm:text-xs md:text-xl pb-4'>{movie.release_date.slice(0,4)}</div>
                        </div>
                    ))}
                </div>
                {/*validación para que haya 20 o menos resultados por página*/}
                <div>
                    {totalResults > 20 ? (<Pagination/>) : null}
                </div>
            </div>
        </div>
    )
}