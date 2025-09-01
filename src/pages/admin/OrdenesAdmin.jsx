import { useEffect, useState } from "react";
import NavApp from "../../components/NavApp";
import styles from "./OrdenesAdmin.module.css";
import { useHistorialContext } from "../../context/historialContext";
import HistorialDetail from "../../components/HistorialDetail";
import { useLocation } from "react-router-dom";

export default function OrdenesAdmin() {
  const nav = [
    { nombre: "Ordenes", imagen: "/menu_icon.svg", link: "/ordenesAdmin" },
    { nombre: "Productos", imagen: "/historial_icon.svg", link: "/productosAdmin" },
    { nombre: "Historial", imagen: "/perfil_icon.svg", link: "/historialAdmin" },
  ];

  const [showNav, setShowNav] = useState(false);
  const { state, dispatch } = useHistorialContext();
  const [filter, setFilter] = useState("");

  const selectFilter = (filtro) => {
    if (filter === filtro) {
      setFilter("");
    } else {
      setFilter(filtro);
    }
  };

  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(state.historial));
  }, [state.historial]);

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
        <div className={styles.contenido}>
          <div className={styles.contenedorHistorial}>
            {state.historial
              .filter((orden) => {
                if (filter.length === 0) return true;
                return filter.includes(orden.estado.toLowerCase());
              })
              .map((orden) => (
                <HistorialDetail
                  key={orden.id}
                  orden={orden}
                  gestionar={true}
                />
              ))}
          </div>
          <div className={styles.contenedorFiltro}>
            <p className={styles.filtroTitulo}>Filtra las ordenes</p>
            <div
              className={`${styles.filtro} ${
                filter === "confirmada" && styles.active
              }`}
              value="confirmada"
              onClick={() => selectFilter("confirmada")}
            >
              <img
                className={styles.filtroImagen}
                src="/confirmada.png"
                alt=""
              />
              <p className={styles.filtroContenido}>Confirmada</p>
            </div>
            <div
              className={`${styles.filtro} ${
                filter === "en preparacion" && styles.active
              }`}
              value="en preparacion"
              onClick={() => selectFilter("en preparacion")}
            >
              <img
                className={styles.filtroImagen}
                src="/preparacion.png"
                alt=""
              />
              <p className={styles.filtroContenido}>En Preparación</p>
            </div>
            <div
              className={`${styles.filtro} ${
                filter === "lista" && styles.active
              }`}
              value="lista"
              onClick={() => selectFilter("lista")}
            >
              <img className={styles.filtroImagen} src="/lista.png" alt="" />
              <p className={styles.filtroContenido}>Lista</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
