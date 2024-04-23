import { NavLink } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import SearchBar from './SearchBar.js'

export default function NavBar() {

    return (
        <nav className='flex bg-white shadow-md justify-between items-center px-8 h-20'>
            {/*logo container*/}
            <NavLink to='/' className='flex text-3xl items-center space-x-2'>
                <img className='size-14 h-full md:hidden' src='icon.png' alt='logo'/>
                <img className='max-md:hidden h-14' src='logo.png' alt='logo'/>
            </NavLink>
            <div>
                <SearchBar/>
            </div>
            <NavLink to='/favorites' className='bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 px-3 py-3 rounded-full cursor-pointer'>
                <FaHeart className='fill-white'/>
            </NavLink>
        </nav>
    )
}