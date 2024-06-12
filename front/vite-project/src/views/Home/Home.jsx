import ImgText from "../../components/ImgText/ImgText";
import productos from "../../helpers/productos";
import { useState, useEffect } from "react";

import { useSelector } from 'react-redux';

import styles from './Home.module.css';


const Home = () => {
    const name = useSelector((state) => state.user.name);
    const [productosToShow, setProductosToShow] = useState(productos);
    return (
        <>
            <div className="">
                <h3 className={styles.title}>Bienvenidos a "Sabores del Mundo"</h3>
                <div className={styles.container}>
                    {/* {textsToShow.map((text, index) => (
                            <ImgText key={index} text={text}/>
                    ))} */}
                    {productosToShow.map((producto, index) => (
                            <ImgText key={index} producto={producto}/>
                    ))}
                </div>
            </div>

        </>
    );
}

export default Home;