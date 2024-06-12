import { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import styles from './ProgramarTurno.module.css';

const ProgramarTurno = () => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const id = useSelector((state) => state.user.id);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loggedIn) {
          navigate('/login');
        } 
      }, [loggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
              await axios.post('http://localhost:3000/turns/schedule', {
              date: date,
              time: time,
              userId: id
            });       
            alert('Se programó el turno correctamente');
          } catch (error) {
            alert('Algo falló al programar el turno. Por favor, inténtalo nuevament');
          }

    };
    

  return (
    <div className={styles.programarTurnoContainer}>
      <div className="fw-bold fs-1 t-10">Programar Reserva</div>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Hora:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default ProgramarTurno