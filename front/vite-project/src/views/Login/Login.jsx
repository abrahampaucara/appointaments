import { useState } from 'react'
import { validate } from '../../helpers/validate'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { setUser } from '../../redux/userSlice';

import styles from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', userData);
      const user = response.data.user;
      const [id, name] = [user.id, user.name];
      dispatch(setUser({ name: name, id: id }));
      dispatch(login());
      navigate('/home');
    } catch (error) {
      setErrorMessage('No se pudo iniciar sesión correctamente. Por favor, inténtalo de nuevo.');
    }
  };  

  const [errors, setErrors] = useState({
    username: 'username is required',
    password: 'password is required',
  })

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })

    const errors = validate(userData)
    setErrors(errors)

  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    loginUser();
  }

  const validarUsername = (username) => {
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username) ? true : false;
  }

  return (
    <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleOnSubmit}>
            <h2 className="fw-bold">LOGIN</h2>
            <div>
                <label className="fw-bold">Username: </label>
                <input 
                    type="text" 
                    value={userData.username} 
                    name='username' 
                    placeholder='user'
                    onChange={handleInputChange}
                    className={styles.input}
                />
                {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
            </div>
            <div>
                <label className="fw-bold">Password: </label>
                <input 
                    type="password" 
                    value={userData.password} 
                    name='password' 
                    placeholder='Contraseña'
                    onChange={handleInputChange}
                    className={styles.input}
                />
                {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
            </div>
            <button className={styles.button}>Iniciar Sesion</button>
        </form>
        <div>
          <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
        <div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    </div>
  )
}

export default Login