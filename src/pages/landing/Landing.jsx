import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { useState } from 'react';

export default function Landing() {
  const images = [
    '/PT Sans.png',
    '/cocina.jpg',
    '/logoFoodlab.png',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Aquí van las funciones corregidas
  const handleLeft = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleRight = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <header>
        <nav className={styles.navegacion}>
          <div className={styles.navegacion_izquierda}>
            <img src="/Logo.png" alt="Logo" className={styles.logo} />
            <div className={styles.navegacion_menu}>
              <p>Inicio</p>
              <p>Nosotros</p>
              <p>Instalaciones</p>
              <p>Contacto</p>
            </div>
          </div>
          <Link to="/login">
            <button className={styles.navegacion_boton_realizar_pedido}>
              Realizar Pedido
            </button>
          </Link>
        </nav>
      </header>
      <main>
        <div className={styles.banner}>
          <img src="/fondo_registro.png" alt="Imagen hamburguesa" />
          <div className={styles.banner_texto}>
            <p>DESARROLLAMOS LA FÓRMULA</p>
            <br />
            <br />
            <br />
            <br />
            <p>A LA QUE NO TE PODRÁS RESISTIR</p>
          </div>
        </div>

        <section className={styles.seccionNosotros}>
          <div className={styles.seccionNosotros_texto}>
            <p>En FoodLab creemos que la buena comida <br />
              no solo se cocina… ¡se formula! Somos <br />
              un restaurante
              de comida rápida donde cada <br />
              bocado es el resultado de una receta <br />
              precisa: sabor, calidad y rapidez<br />
              en la medida perfecta.</p>
            <br />
            <br />
            <p>Inspirados en la creatividad de un <br />
              laboratorio, combinamos ingredientes <br />
              frescos, técnicas innovadoras y un toque de <br />
              locura culinaria para sorprenderte en cada <br />
              visita.Nuestro objetivo es simple: que <br />
              disfrutes de tu comida favorita con la <br />
              fórmula que siempre funciona — rápida,<br />
              deliciosa y con un estilo único.</p>
          </div>
          <div className={styles.seccionNosotros_imagen}>
            <img src="/pexels-valeriya-1639562.jpg" alt="Fondo nosotros" />
          </div>
        </section >
        <section className={styles.seccion_instalaciones}>
          <div className={styles.carousel}>
            <button onClick={handleLeft} className={styles.arrowLeft}>«</button>

            <div className={styles.container}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.item} ${index === activeIndex ? styles.center : ''}`}
                >
                  <img src={img} alt={`img-${index}`} />
                </div>
              ))}
            </div>

            <button onClick={handleRight} className={styles.arrowRight}>»</button>
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.fondo_contactanos}>
          <img src="/pexels-liliana-drew-8555066.jpg" alt="Logo" />
        </div>

        <section className={styles.seccion_contactanos}>
          <aside className={styles.formulario}>
            <h2>Envianos un mensaje</h2>
            <form>
              <label htmlFor="email">Email: </label>
              <input type="text" placeholder="username@gmail.com" />

              <label htmlFor="mensaje" className={styles.mensaje}>Mensaje: </label>
              <textarea id="mensaje" className={styles.textarea}></textarea>

              <input className={styles.enviar} type="submit" value="ENVIAR" />
            </form>
          </aside>
          <div className={styles.redesWrapper}>
            <div className={styles.redes}>
              <img src="/icon-twitter.svg" alt="Twitter" />
              <img src="/icon-facebook.svg" alt="Facebook" />
              <img src="/icons8-instagram.svg" alt="Instagram" />
            </div>
          </div>
          <div className={styles.contactoInfo}>
            <h3>¡CONTACTANOS!</h3>
            <img src="/localizacion.png" alt="Localizacion" />
            <p>Calle 14 #15-23, Barrio La Castellana,<br /> Armenia, Quindío, Colombia</p>
            <br />

            <img src="/llamada-telefonica.png" alt="Llamada" />
            <p>+57 311 456 7890</p>
            <br />
            <img src="/correo-electronico.png" alt="Correo" />
            <p>contacto@foodlab.com.co</p>
          </div>
          <div className={styles.logo_pequeño}>
            <img src="/Logo.png" alt="Logo" />
          </div>
        </section>  
      </main >
    </div >
  );
}
