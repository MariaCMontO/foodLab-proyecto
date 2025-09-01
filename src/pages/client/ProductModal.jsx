import { useHelpers } from "../../hooks/useHelpers";
import styles from "./ProductModal.module.css";

export default function ProductModal({ producto, setModal }) {
    const {formatoCOP}= useHelpers()
  return (
    <>
      <div className={styles.overlay} onClick={() => setModal(null)}></div>
      <div className={styles.contenedor}>
        <h1 className={styles.nombre}>{producto.nombre}</h1>
        <div className={styles.contenedorImagen}>
          <img className={styles.imagen} src={producto.imagen} alt="" />
        </div>
        <p className={styles.precio}>{formatoCOP.format(producto.precio)}</p>
        <p className={styles.descripcion}>{producto.descripcion}</p>
      </div>
    </>
  );
}
