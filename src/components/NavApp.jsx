import { NavLink } from "react-router-dom";
import styles from "./NavApp.module.css";

export default function NavApp({ elementos, custom}) {
  return (
    <>
      <div className={styles.contenedorPrincipal}>
        {elementos.map((elemento) =>
          elemento.custom ? (
            <button
              key={elemento.nombre}
              onClick={elemento.custom}
              className={styles.contenedor}
            >
              <img className={styles.imagen} src={elemento.imagen} alt="" />
              <p className={styles.texto}>{elemento.nombre}</p>
            </button>
          ) : (
            <NavLink
              state={{usuario:elemento.usuario}}
              to={elemento.link}
              key={elemento.nombre}
              className={({ isActive }) =>
                isActive
                  ? `${styles.contenedor} ${styles.active}`
                  : `${styles.contenedor}`
              }
            >
              <img className={styles.imagen} src={elemento.imagen} alt="" />
              <p className={styles.texto}>{elemento.nombre}</p>
            </NavLink>
          )
        )}
      </div>
    </>
  );
}
