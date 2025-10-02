import styles from "./HistorialDetail.module.css";
import CartDetail from "./CartDetail";
import { useHelpers } from "../hooks/useHelpers";
import { useHistorialContext } from "../context/historialContext";
import { cambiarEstado } from "../acciones/accionesHistorial";
import CartDetailAdmin from "./CartDetailAdmin";

export default function HistorialDetail({ orden, gestionar, ver }) {
  const { formatoCOP } = useHelpers();
  const { dispatch } = useHistorialContext();

  const selectChange = (e) => {
    const estado = e.target.value;
    cambiarEstado(orden, estado, dispatch);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorRow}>
        <p className={styles.parrafos}>Orden:</p>
        <p className={styles.parrafos}>{orden.idOrder}</p>
      </div>
      <div className={styles.contenedorRow}>
        <p className={styles.parrafos}>Cliente:</p>
        <p className={styles.parrafos}>{orden.user.nombre}</p>
        <button type="button" className={styles.botonPdf}>
          FACTURA
        </button>
      </div>
      <div>
        <div className={styles.contenedorProductos}>
          {orden.products.map((producto, index) => (
            <CartDetailAdmin
              producto={producto}
              historial={true}
              key={producto.productoId || index}
            />
          ))}
        </div>
      </div>
      <div className={styles.contenedorFinal}>
        <div className={styles.contenedorRow}>
          <p className={styles.parrafos}>Fecha:</p>
          <p className={styles.parrafos}>{orden.date}</p>
        </div>
        <div className={styles.contenedorTotal}>
          <p className={styles.parrafosRojos}>Total:</p>
          <p className={styles.parrafosRojos}>{formatoCOP.format(orden.total)}</p>
        </div>
      </div>
      {gestionar && (
        <select
          onChange={selectChange}
          className={styles.select}
          defaultValue={orden.state}
        >
          <option className={styles.option} value="confirmada">
            CONFIRMADA
          </option>
          <option className={styles.option} value="en Preparacion">
            EN PREPARACION
          </option>
          <option className={styles.option} value="lista">
            LISTA
          </option>
        </select>
      )}
      {ver &&(
        <p className={styles.ver}>{orden.state}</p>
      )}
    </div>
  );
}
