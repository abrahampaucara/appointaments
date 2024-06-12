import './App.css'
import Home from './views/Home/Home'
import Navbar from './components/Navbar/Navbar'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import { Routes , Route, useLocation } from 'react-router'
import ErrorPage from './views/ErrorPage/ErrorPage'
import ProgramarTurno from './views/ProgramarTurno/ProgramarTurno'
import AboutUs from './views/AboutUs/AboutUs'
import Contact from './views/Contact/Contact'



function App() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/login' || location.pathname === '/register' ? null : <Navbar />}
      <div
        style={{
          width: '70vw',
          margin: 'auto',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schelude" element={<ProgramarTurno />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      
    </>
  )
}

export default App
