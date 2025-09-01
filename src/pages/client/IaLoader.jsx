import styles from "./iaLoader.module.css";

export default function IaLoader() {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.contenedor}>
        <div className={styles.spinner}>
        <img className={styles.imagen} src="/Loader.png" alt="" />
        </div>
      </div>
    </>
  );
}
