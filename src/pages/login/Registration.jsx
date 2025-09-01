import { Link, useNavigate } from "react-router-dom";
import styles from "./Registro.module.css";
import { useState } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";
import { v4 as uuid } from "uuid";

export default function Registration() {
    const usuarioVacio = {
        id: "",
        nombre: "",
        email: "",
        contraseña: "",
        celular: "",
        direccion: "",
        tipo: "",
        ingredientes: "",
        restricciones: "",
        expectativas: "",
        favorita: "",
        pago: {
            metodo: "",
            numero: "",
            nombreT: "",
            cvv: "",
        },
    };

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(usuarioVacio);
    const { dispatch } = useUsuariosContext();

    const handleChange = (e) => {
        console.log(usuario);
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioCreado = {
            ...usuario,
            id: uuid(),
            tipo: 'cliente'
        }

        dispatch({ type: "Añadir usuario", payload: { usuario: usuarioCreado } });
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

                        <label htmlFor="contraseña">Contraseña: </label>
                        <input
                            type="password"
                            placeholder="***********"
                            name="contraseña"
                            id="contraseña"
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
