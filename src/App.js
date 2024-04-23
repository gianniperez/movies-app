import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Favorites from './components/Favorites.js'


export default function App() {

  const pagePaths = []

  //función para agregar su respectivo path a cada página
  for (let i = 1; i <= 10; i++) {
    pagePaths.push(
      <Route key={i} exact path={`/${i}`} element={<Home/>}/>
    )
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        {pagePaths}
        <Route exact path='/favorites' element={<Favorites/>}/>
      </Routes>
    </div>
  )
}