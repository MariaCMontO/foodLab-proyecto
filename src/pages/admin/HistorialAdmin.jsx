import { useState } from "react";
import NavApp from "../../components/NavApp";
import styles from "./HistorialAdmin.module.css";
import { useHistorialContext } from "../../context/historialContext";
import HistorialDetail from "../../components/HistorialDetail";

export default function HistorialAdmin() {
  const nav = [
    { nombre: "Ordenes", imagen: "/menu_icon.svg", link: "/ordenesAdmin" },
    {
      nombre: "Productos",
      imagen: "/historial_icon.svg",
      link: "/productosAdmin",
    },
    {
      nombre: "Historial",
      imagen: "/perfil_icon.svg",
      link: "/historialAdmin",
    },
  ];

  const [showNav, setShowNav] = useState(false);
  const { state, dispatch } = useHistorialContext();

  return (
    <main className={styles.contenedor}>
      <div
        onClick={() => setShowNav(!showNav)}
        className={`${showNav && styles.overlay}`}
      ></div>
      <div
        className={`${styles.nav} ${showNav ? styles.visible : styles.hidden}`}
      >
        <NavApp elementos={nav} />
      </div>
      <div className={styles.contenedorPrincipal}>
        <div className={styles.contenedorMenu}>
          <button className={styles.menu} onClick={() => setShowNav(!showNav)}>
            <img src="/menu_hamburguesa.svg" alt="" />
          </button>
          <img className={styles.logo} src="/Logo.png" alt="" />
        </div>
        <div className={styles.contenedorHistorial}>
          {state.historial
            .filter(
              (orden) => orden.estado === "lista"
            )
            .map((orden) => (
              <HistorialDetail key={orden.id} orden={orden} />
            ))}
        </div>
      </div>
    </main>
  );
}
