import style from './Turno.module.css'
import { useState } from 'react';
import axios from 'axios';

const Turno = ({time, date, description, status: initialStatus, id}) => {

  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth()+1}/${dateObject.getFullYear()}`;

  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = async() => {
    
    try {
      setStatus("cancelled");
      await axios.put(`http://localhost:3000/turns/cancel/${id}`, {
        status: initialStatus
      });

    } catch (error) {
      alert('Algo falló al actualizar el turno. Por favor, inténtalo nuevamente');
    }
  };

  return (
    <div className={style.container}>
        <h4 className={style.spacing}>Hora: {time}</h4>
        <h4 className={style.spacing}>Fecha: {formattedDate}</h4>
        <h4 className={style.spacing}>{description}</h4>
        <h4 className={style[status]}>{status}</h4>
        <button className={style.spacing} disabled={status=="cancelled"} onClick={handleStatusChange}>Cancelar Turno</button>
        
    </div>
  )
}

export default Turno