import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 >Contacto</h1>
      <br/>
      <p className={styles.textarea}>Si tienes alguna pregunta o comentario, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
      <br/>
      <h2>Información de Contacto</h2>
      <br/>
      <p><strong>Dirección:</strong> 123 Calle Principal, Ciudad, Estado, Código Postal</p>
      <p><strong>Teléfono:</strong> (123) 456-7890</p>
      <p><strong>Email:</strong> info@nuestrositio.com</p>

      <h2>Horario de Atención</h2>
      <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
      <p>Sábado y Domingo: Cerrado</p>
    </div>
    
  )
}

export default Contact