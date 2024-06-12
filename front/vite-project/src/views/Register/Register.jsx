import axios from "axios";
import { useState } from "react";
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name : "",
    email : "",
    birthdate : "",
    nDni : "",
    username : "",
    password : ""
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const funcionPeticion = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/user/register', form);
    navigate('/login');
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={funcionPeticion}>
        <label>Name:</label>
        <input className={styles.inputField} type="text" name="name" value={form.name} onChange={handleInputChange} />

        <label>Email:</label>
        <input className={styles.inputField} type="email" name="email" value={form.email} onChange={handleInputChange} />

        <label>Birthdate:</label>
        <input className={styles.inputField} type="date" name="birthdate" value={form.birthdate} onChange={handleInputChange} />

        <label>DNI:</label>
        <input className={styles.inputField} type="text" name="nDni" value={form.nDni} onChange={handleInputChange} />

        <label>Username:</label>
        <input className={styles.inputField} type="text" name="username" value={form.username} onChange={handleInputChange} />

        <label>Password:</label>
        <input className={styles.inputField} type="password" name="password" value={form.password} onChange={handleInputChange} />

        <button className={styles.submitButton} type="submit">Register</button>
      </form>
  </div>
  )
}

export default Register