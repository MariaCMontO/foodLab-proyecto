import { useState } from "react";
import { useCarritoContext } from "../../context/carritoContext";
import { useHelpers } from "../../hooks/useHelpers";
import styles from "./NotaModal.module.css";

export default function NotaModal({notaModal,setNotaModal}) {

    const {dispatch}=useCarritoContext()
    const [nota, setNota]= useState("")

    const onChange= (e) =>{
      setNota(e.target.value)
    }

    function clickGuardar(){
      dispatch({type:"Agregar nota", payload:{producto:notaModal, nota}})
      setNotaModal(null)
    }
  return (
    <>
      <div className={styles.overlay} onClick={() => setNotaModal(null)}></div>
      <div className={styles.contenedor}>
        <label htmlFor="nota" className={styles.label}>Ingrese su nota aqui:</label>
        <input type="text" id="nota" name="nota" value={nota} onChange={onChange} className={styles.input} placeholder="Ej: Sin cebolla"/>
        <button className={styles.boton} onClick={clickGuardar}>GUARDAR</button>
      </div>
    </>
  );
}
