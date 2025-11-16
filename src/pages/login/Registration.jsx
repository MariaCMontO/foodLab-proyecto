import { Link, useNavigate } from "react-router-dom";
import styles from "./Registro.module.css";
import { useState } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";
import { v4 as uuid } from "uuid";
import { guardarUsuario } from "../../acciones/accionesUsuario";

export default function Registration() {

    // Estructura de un usuario
    const usuarioVacio = {
        nombre: "",
        email: "",
        contrasenia: "",
        celular: "",
        direccion: "",
        rol: "",
    };

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(usuarioVacio);
    const {state, dispatch } = useUsuariosContext();

    //Cada que cambie un campo del input
    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    //Cuando se oprima el boton de submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const usuarioCreado = {
            ...usuario,
            rol: 'CLIENTE'
        }
        guardarUsuario(dispatch,state, usuarioCreado)
        navigate("/login");
    };

    return (
        <div className={styles.contenedor}>
            <img
                className={styles.vanished}
                src="/fondo_registro_recortada.png"
                alt="Fondo"
            />

            <Link to="/">
                <button className={styles.back}>Regresar</button>
            </Link>

            <section className={styles.registro}>
                <div className={styles.formulario}>
                    <h2>Registrate</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre: </label>
                        <input
                            type="text"
                            placeholder="Nombres Apellidos"
                            name="nombre"
                            id="nombre"
                            onChange={handleChange}
                        />

                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            placeholder="correo@gmail.com"
                            name="email"
                            id="email"
                            onChange={handleChange}
                        />

                        <label htmlFor="contrasenia">Contraseña: </label>
                        <input
                            type="password"
                            placeholder="***********"
                            name="contrasenia"
                            id="contrasenia"
                            onChange={handleChange}
                        />

                        <label htmlFor="celular">Celular: </label>
                        <input
                            type="text"
                            placeholder="123 456 7890"
                            name="celular"
                            id="celular"
                            onChange={handleChange}
                        />

                        <label htmlFor="direccion">Direccion: </label>
                        <input
                            type="text"
                            placeholder="##########"
                            name="direccion"
                            id="direccion"
                            onChange={handleChange}
                        />

                        <div className={styles.contenedor_terminos}>
                            <input
                                className={styles.check_terminos}
                                type="checkbox"
                                name="acepto"
                                value="acepto"
                            />
                            <label className={styles.texto_terminos} htmlFor="checkbox">
                                Aceptar términos y condiciones.
                            </label>
                        </div>

                        <button type="submit" className={styles.boton}>
                            REGISTRARSE
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
