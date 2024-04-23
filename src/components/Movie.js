import { useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppContext } from './context/appContext.js'
import { IMAGE_URL } from './API.js'
import { Rating } from './Rating.js'

export default function Movie() {

    const { cast, movie, open, setOpen, favorites, addToFavorites, removeFromFavorites } = useAppContext()
    const cancelButtonRef = useRef(null)

    const favoritesChecker = (id) => {
        const boolean = favorites.some((movie) => movie.id === id)
        return boolean
    }

    return (
        <div>
            {movie ? (
            <Transition.Root show={open}>
                <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
                    {/* opacity */}
                    <Transition.Child enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'/>
                    </Transition.Child>

                    {/* movie container */}
                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div className='flex justify-center text-center'>
                            <Transition.Child enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:m-24 sm:max-w-7xl'>
                                <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4 max-sm:w-[60vw]'>
                                <div className='flex max-lg:flex-col shrink-0'>
                                    <img className='rounded-xl h-[58vh] max-lg:h-full pb-4' src={`${IMAGE_URL + movie.poster_path}`} alt={`${movie.title}`}/>
                                    <div className='mt-3 text-center ml-6 lg:text-left space-y-8'>
                                        <div className='flex max-lg:flex-col flex-row max-lg:flex-col-reverse justify-between items-center'>
                                            <Dialog.Title className='text-2xl text-base font-bold text-gray-900'>
                                                {movie.title}
                                            </Dialog.Title>
                                            <Rating/>
                                        </div>
                                        <div className='text-sm text-gray-600 mt-2 space-y-2 space-y-2'>
                                            <h2 className='font-semibold'>Overview</h2>
                                            <p> {movie.overview}</p>
                                            <h2 className='font-semibold'>Rating</h2>
                                            <p> {movie.vote_average}</p>
                                            <h2 className='font-semibold'>Cast</h2>
                                            <div className='flex flex-wrap container gap-2'>
                                                {cast.map((actor) => (
                                                    <div key={actor}>
                                                        <p className='rounded border-2 border-l-sky-500 border-t-sky-500 border-r-indigo-500 border-b-indigo-500 px-1'>{actor}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                {/* favorites button */}
                                {favoritesChecker(movie.id) ? (
                                    <button
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'
                                        onClick={() => removeFromFavorites(movie.id)}
                                        ref={cancelButtonRef}>
                                            Remove From Favorites
                                        </button>
                                    ) : (
                                    <button
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'
                                        onClick={() => addToFavorites(movie)}
                                        ref={cancelButtonRef}>
                                            Add to Favorites
                                        </button>
                                )}
                                {/* Cancel button */}
                                <button
                                    type='button'
                                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto'
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}>
                                    Cancel
                                </button>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>) : null}
        </div>
    )
}