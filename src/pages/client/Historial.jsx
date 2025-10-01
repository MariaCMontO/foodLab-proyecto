import { useEffect, useState } from "react";
import NavApp from "../../components/NavApp";
import styles from "./Historial.module.css";
import { useHistorialContext } from "../../context/historialContext";
import HistorialDetail from "../../components/HistorialDetail";
import { useNavigate } from "react-router-dom";
import IaLoader from "./IaLoader";
import { useUsuariosContext } from "../../context/usuariosContext";
import { navCliente } from "../../data/helpers";

export default function Historial() {
  
  const {state:stateUsuario}= useUsuariosContext()
  const {usuarioActivo: usuario}= stateUsuario
  const nav = navCliente()
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
          .filter((orden) => orden.cliente.id===usuario.id && orden.estado==='lista')
          .map((orden) => (
            <HistorialDetail
            key={orden.id}
            orden={orden}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
