import { useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import styles from './MisTurnos.module.css';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const id = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  useEffect( () => {
    if (!loggedIn) {
      navigate('/login');
    } 
    
    axios.get('http://localhost:3000/turns')
    .then((res) => {
      res.data = res.data.filter((turno) => turno.userId === id);
      res.data.sort((a, b) => b.id - a.id);
      setTurnos(res.data);
    })
    .catch((err) => console.log(err));

  }, [loggedIn, id, navigate]);

  
  return (
    <div className={styles.misTurnosContainer}>
      <h1>Mis Reservas</h1>
      

      <div className={styles.turnosContainer}>
        {turnos.map(({time, date, description, status, id}) => (
          <Turno  
            time={time}
            date={date}
            description={description}
            status={status}
            key={id}
            id={id}
          />
        ))}
      </div>
    </div>
  )
}

export default MisTurnos