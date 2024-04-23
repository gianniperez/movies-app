import { useState } from 'react'
import { useAppContext } from './context/appContext.js'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {

    const { searchMovies, setSearchKey } = useAppContext()
    const [input, setInput] = useState('')

    const clearInput = () => {
        setInput('')
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter") (
            clearInput()
        )
    }

    const handleChange = (e) => {
        setInput(e)
        setSearchKey(e)
    }

    return (
        <form className='flex justify-center border-2 rounded-full pl-4' onSubmit={searchMovies} onKeyDown={handleSubmit}>
            <input value={input}  className='outline-none max-lg:w-[40vw] lg:w-96' type='text' placeholder='Search for a movie...' onChange={(e) => handleChange(e.target.value)}/>
            <button className='bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white rounded-full px-3 py-3 '><FaSearch/></button>
        </form>
    )
}