import { Link } from "react-router-dom";
import Styles from "./iaPortal.module.css";

export default function IaPortal() {
  return (
    <>
       <div className={Styles.cuadroPrincipal}>
            <div className={Styles.cuadroSecundario}>
              <img className={Styles.logo} src="/Logo.png" alt="Logo" />
              {/* Titulo del cuadro secundario */}
              <h1 className={Styles.titulo}>
                ¡ESTAS A UN PASO DE GENERAR TU PEDIDO CON IA!
              </h1>
              {/* Primer cuadrito donde estan las preguntas */}
              <div className={Styles.cuadroPreguntas}>
                <div className={Styles.contenedorPregunta1}>
                  <p className={Styles.pregunta}>Cuantas personas comeran hoy ?</p>
                  <input className={Styles.input} type="number" />
                </div>
                <div className={Styles.contenedorPregunta2}>
                  <p className={Styles.pregunta}>Notas adicionales para tu pedido:</p>
                  <textarea className={Styles.textArea} type="text"></textarea>
                </div>
              </div>
              {/* Segundo cuadrito donde esta el mensaje de rojo */}
              <div className={Styles.cuadroRojo}>
                <p>
                  ¡ATENCIÓN ANTOJAD@S!, NUESTRA IA PREPARÁ TU PEDIDO BASÁNDOSE EN TUS
                  GUSTOS GUARDADOS EN EL PERFIL. PERFECTO PARA ESOS DÍAS EN LOS QUE
                  TIENES UN ANTOJO MISTERIOSO... ¡Y NI TÚ SABES EXACTAMENTE DE QUÉ!
                </p>
              </div>
              {/* Boton de pagar */}
              <Link to="/pago" className={Styles.boton} state={{ia: true}}>
              <button className={Styles.boton}>GENERAR PEDIDO CON IA</button>
              </Link>
            </div>
          </div>
    </>
  );
}
