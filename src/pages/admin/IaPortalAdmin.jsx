import { Link } from "react-router-dom";
import styles from "./iaPortalAdmin.module.css";
import { navAdmin, navCliente } from "../../data/helpers";
import { useState } from "react";
import { useHistorialContext } from "../../context/historialContext";
import { useUsuariosContext } from "../../context/usuariosContext";
import NavApp from "../../components/NavApp";

export default function IaPortalAdmin() {

    const nav = navAdmin
    const [showNav, setShowNav] = useState(false);
    const { state, dispatch } = useHistorialContext();
  return (
    <>
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
               <div className={styles.ia}>
                <div className={styles.chat}>
                  <div className={styles.contenedorTexto}>

                  </div>
                  <div className={styles.escribir}>
                  <input className={styles.input} type="text" placeholder="Ingrese su consulta" />
                  <button className={styles.boton} type="button">Enviar</button>
                  </div>
                </div>
                <div className={styles.respuesta}>
                  
                </div>
               </div>
             </div>
           </main>
    </>
  );
}
