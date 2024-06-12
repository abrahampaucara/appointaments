import styles from './ImgText.module.css';

const ImgText = ({ producto }) => {
  return (
    <div className={styles.imgTextCard}>
      <img className={styles.img} src={producto.url}/>
      <p className={styles.text}>{producto.text}</p>
    </div>
  )
}

export default ImgText