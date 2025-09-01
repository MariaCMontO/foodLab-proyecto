import styles from "./HistorialDetail.module.css";
import CartDetail from "./CartDetail";
import { useHelpers } from "../hooks/useHelpers";
import { useHistorialContext } from "../context/historialContext";

export default function HistorialDetail({ orden, gestionar }) {
  const total = orden.productos.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);

  const { formatoCOP } = useHelpers();

  const {dispatch} = useHistorialContext();


  const selectChange= (e) => {
    const estado=e.target.value;

    dispatch({type:'Cambiar estado', payload:{orden, estado}})
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorRow}>
        <p className={styles.parrafos}>Orden:</p>
        <p className={styles.parrafos}>{orden.id}</p>
      </div>
      <div className={styles.contenedorRow}>
        <p className={styles.parrafos}>Cliente:</p>
        <p className={styles.parrafos}>{orden.cliente.nombre}</p>
      </div>
      <div>
        <div className={styles.contenedorProductos}>
          {orden.productos.map((producto) => (
            <CartDetail producto={producto} historial={true} key={producto.id}/>
          ))}
        </div>
      </div>
      <div className={styles.contenedorFinal}>
        <div className={styles.contenedorRow}>
          <p className={styles.parrafos}>Fecha:</p>
          <p className={styles.parrafos}>{orden.fecha}</p>
        </div>
        <div className={styles.contenedorTotal}>
          <p className={styles.parrafosRojos}>Total:</p>
          <p className={styles.parrafosRojos}>{formatoCOP.format(total)}</p>
        </div>
      </div>
      {gestionar && (
        <select onChange={selectChange} className={styles.select} defaultValue={orden.estado}>
          <option className={styles.option} value="confirmada">CONFIRMADA</option>
          <option className={styles.option} value="en Preparacion">EN PREPARACION</option>
          <option className={styles.option}
           value="lista">LISTA</option>
        </select>
      )}
    </div>
  );
}
