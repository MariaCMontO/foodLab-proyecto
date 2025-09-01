import styles from "./CategoryIcon.module.css";

export default function CategoryIcon({categoria, setCategory, selected, registro}) {
  return (
      <div id="categoria" className={`${registro? styles.registro : styles.contenedor} ${selected&& styles.activo}`}  onClick={() => setCategory(categoria.nombre)}>
        <img className={`${styles.imagen} ${registro&& styles.imagenRegistro}`} src={categoria.imagen} alt="" />
        <p className={`${styles.texto} ${registro&& styles.textoRegistro}`}>{categoria.nombre}</p>
      </div>
  );
}
