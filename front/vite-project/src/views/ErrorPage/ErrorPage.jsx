import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const ErrorPage = () => {

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((countdown) => countdown - 1)
        }, 1000)

        setTimeout(() => {
            clearInterval(interval)
            navigate('/home')
        }, 5000)

        return () => clearInterval(interval)
        }, [navigate])


  return (
    <div>
        <h1>Page Not Found</h1>
        <p>Redireccionando al home in {countdown} segundos </p>
    </div>
  )
}

export default ErrorPage