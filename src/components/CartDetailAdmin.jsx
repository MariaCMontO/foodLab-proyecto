import { useCarritoContext } from "../context/carritoContext";
import { useHelpers } from "../hooks/useHelpers";
import styles from "./CartDetail.module.css";

export default function CartDetailAdmin({ producto, setNotaModal, historial }) {
  const { formatoCOP } = useHelpers();
  const { dispatch } = useCarritoContext();

  const total=producto.cantidad*producto.precio;
  

  return (
    <div className={styles.container}>
      <div className={styles.contenedorImagen}>
        <img className={styles.image} src={producto.producto.imagen} alt="" />
      </div>
      <div className={styles.contenedorColumn}>
        <div className={styles.contenedorRow}>
          <p className={styles.nombre}>{producto.producto.nombre}</p>
          <button
            onClick={() =>
              dispatch({ type: "Eliminar producto", payload: { producto } })
            }
            className={`${styles.closeBoton} ${historial && styles.hidden}`}
          >
            <img className={styles.closeImagen} src="/close_icon.png" alt="" />
          </button>
        </div>
        <p className={styles.precio}>
          {formatoCOP.format(producto.producto.precio)}
        </p>
        <div className={styles.contenedorRow}>
          <div
            className={`${styles.modificarBoton} ${
              historial && styles.centrado
            }`}
          >
            <button
              onClick={() =>
                dispatch({ type: "Disminuir cantidad", payload: { producto } })
              }
              className={`${styles.botones} ${historial && styles.hidden}`}
            >
              -
            </button>
            <p className={styles.numero}>{producto.cantidad}</p>
            <button
              onClick={() =>
                dispatch({ type: "Añadir cantidad", payload: { producto } })
              }
              className={`${styles.botones} ${historial && styles.hidden}`}
            >
              +
            </button>
          </div>
          <p
            className={`${styles.subtotal} ${
              historial && styles.subtotalGrande
            }`}
          >
            Subtotal:
            <span>{formatoCOP.format(total)}</span>
          </p>
          {producto.nota != "" ? (
            <div className={styles.contenedorNota}>
              <p className={`${styles.nota}`}>{producto.nota}</p>
              <button
                className={`${styles.editarBoton} ${
                  historial && styles.hidden
                }`}
                onClick={() => setNotaModal(producto)}
              >
                <img
                  className={styles.editarImagen}
                  src="/editar_icon.png"
                  alt=""
                />
              </button>
            </div>
          ) : (
            <div>
              <button
                className={`${styles.agregarBoton} ${
                  historial && styles.hidden
                }`}
                onClick={() => setNotaModal(producto)}
              >
                Agregar nota
              </button>
              <p className={`${historial ? styles.notaGrande : styles.hidden}`}>
                No hay notas
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
