import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";
import { buscarPorCorreoConstraseña } from "../../peticiones/user";
import { buscarPorEmailyContraseña } from "../../acciones/accionesUsuario";

export default function Login() {
  const usuarioVacio = {
    email: "",
    contraseña: "",
  };

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(usuarioVacio);
  const { state, dispatch } = useUsuariosContext();

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
    if (!Object.values(usuario).includes("")) {
      const usuarioExiste = await buscarPorEmailyContraseña(usuario);
      localStorage.setItem("token", usuarioExiste.token);

      if (usuarioExiste.usuario) {
        if (usuarioExiste.usuario.rol === "ADMIN") {
          navigate("/ordenesAdmin", { state: { usuario: usuarioExiste }});
        }
        if (usuarioExiste.usuario.rol === "CLIENTE") {
          navigate("/cliente", { state: { usuario: usuarioExiste } });
        }
        dispatch({
            type: "Usuario activo",
            payload: { usuario: usuarioExiste.usuario },
          });
      }
    }
    }catch(error){
      console.log("Error al iniciar sesion: "+error)
    }
  };

  return (
    <div className={styles.contenedor}>
      <Link to="/">
        <button className={styles.back}>Regresar</button>
      </Link>

      <div>
        <img className={styles.vanished} src="/fondo_login.png" alt="Fondo" />
      </div>

      <section className={styles.login}>
        <div className={styles.imagenes}>
          <img className={styles.logo} src="/Logo.png" alt="Logo" />
          <img
            className={styles.hamburguesa2}
            src="/fondo_login.png"
            alt="Fondo2"
          />
        </div>

        <aside className={styles.formulario}>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="correo@gmail.com"
              name="email"
              id="email"
              value={usuario.email}
              onChange={handleChange}
            />

            <label htmlFor="contraseña">Contraseña: </label>
            <input
              type="password"
              placeholder="***********"
              name="contraseña"
              id="contraseña"
              value={usuario.contraseña}
              onChange={handleChange}
            />

            <span className={styles.reset}>Olvidaste tu contraseña?</span>

            <button className={styles.ingresar} type="submit">
              INGRESAR
            </button>

            <Link to="/registro">
              <span className={styles.registrate}>
                No tienes cuenta aún? <b>Regístrate aquí</b>
              </span>
            </Link>
          </form>
        </aside>
      </section>
    </div>
  );
}
