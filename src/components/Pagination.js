import { NavLink } from 'react-router-dom'
import { useAppContext } from './context/appContext.js'
import { GrNext, GrPrevious } from 'react-icons/gr'

export default function Pagination () {

    const { currentPage, setCurrentPage, fetchPage, totalResults } = useAppContext()
    const pages = (totalResults / 20)
    const pageLinks = []

    //función para limitar la paginación en caso de haber más de 10 páginas de resultados
    const numberPages = () => {
        if (pages < 10) {
            return pages
        } else {
            return 10
        }
    }

    //función para enumerar las páginas
    for (let i = 1; i <= numberPages(); i++) {
        pageLinks.push(
            <NavLink
                to={`/${i}`}
                className={({ isActive }) => isActive ? 'font-semibold rounded-full max-lg:hidden bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-0.5' : 'border-2 border-l-sky-500 border-t-sky-500 border-r-indigo-500 border-b-indigo-500 bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-500 hover:text-white hover:border-none hover:px-0.5 font-semibold text-indigo-500 rounded-full max-lg:hidden'}
                key={i}
                onClick={() => selectPage(i)}>
                <button className='w-10 h-10'>
                    {i}
                </button>
            </NavLink>
        )
    }

    //función para dirigirse hacia una página seleccionando su número
    const selectPage = (i) => {
        setCurrentPage(i)
        fetchPage(i)
    }

    //función para dirigirse hacia la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        fetchPage(currentPage - 1)
    }

    //función para dirigirse hacia la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        fetchPage(currentPage + 1)
    }

    return (
        <div>
            {/*barra de paginación*/}
            <ul className='flex flex-wrap flex-row space-x-6 mb-10'>
                {currentPage > 1 ? 
                    <NavLink to={`/${currentPage - 1}`} className={'flex bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 rounded-full text-white justify-center p-3.5 cursor-pointer'} onClick={() => prevPage()}>
                        <button>
                            <GrPrevious/>
                        </button>
                    </NavLink>
                : null}
                {pageLinks}
                {currentPage < numberPages() ?
                    <NavLink to={`/${currentPage + 1}`} className={'flex bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 rounded-full text-white justify-center p-3.5 cursor-pointer'} onClick={() => nextPage()}>
                        <button>
                            <GrNext/>
                        </button>
                    </NavLink>
                : null}
            </ul>
        </div>
    )
}