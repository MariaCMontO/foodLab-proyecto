import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import NavApp from "../../components/NavApp";
import CategoryIcon from "../../components/CategoryIcon";
import { Link, useNavigate } from "react-router-dom";
import IaLoader from "./IaLoader";
import { useUsuariosContext } from "../../context/usuariosContext";
import { guardarUsuario } from "../../acciones/accionesUsuario";
import { iconsI, navCliente } from "../../data/helpers";

export default function Profile() {
  //Usuario registrado
  const { state, dispatch } = useUsuariosContext();
  const { usuarioActivo: usuario } = state;
  const nav = navCliente(usuario);
  const icons = iconsI;

  const metodoPagoDefault = {
    id: usuario.metodoPago?.id ?? null,
    tipoTarjeta: "",
    numeroTarjeta: null,
    franquicia: "",
    cvv: null,
  };

  const preferenciasDefault = {
    id: usuario.preferencia?.id ?? null,
    ingredientes: "",
    restricciones: "",
    expectativas: "",
    comidaFavorita: "",
  };

  //Estados
  const [usuarioEditado, setUsuarioEditado] = useState({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    celular: usuario.celular,
    direccion: usuario.direccion,
    metodoPago: usuario?.metodoPago ?? metodoPagoDefault,
    preferencia: usuario?.preferencia ?? preferenciasDefault,
  });

  const [edit, setEdit] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [category, setCategory] = useState(
    usuarioEditado.preferencia.comidaFavorita
  );

  //Cada que cambie el usuario, cambia el usuarioEditado
  useEffect(() => {
    setUsuarioEditado({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      celular: usuario.celular,
      direccion: usuario.direccion,
      metodoPago: usuario?.metodoPago ?? metodoPagoDefault,
      preferencia: usuario?.preferencia ?? preferenciasDefault,
    });
  }, [usuario]);

  //Cada que cambia el usuario, se settea su categoria favorita en el state
  useEffect(() => {
    setCategory(usuarioEditado.preferencia.comidaFavorita);
  }, [usuarioEditado.preferencia.comidaFavorita]);

  // Editar campos normales (nombre, email, etc.)
  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Editar preferencias
  const handleChangePreferencias = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({
      ...prev,
      preferencia: {
        ...prev.preferencia,
        [name]: value,
      },
    }));
  };

  // Editar método pago
  const handleChangeMetodoPago = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({
      ...prev,
      metodoPago: {
        ...prev.metodoPago,
        [name]: value,
      },
    }));
  };

  //Cuando se oprima el boton de guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...usuarioEditado,
      metodoPago: usuarioEditado.metodoPago,
      preferencia: usuarioEditado.preferencia,
    };

    await guardarUsuario(dispatch, state, payload);
  };

  //Cuando se de click en cerrar sesion
  const cerrarSesion = () => {
    dispatch({ type: "Usuario activo", payload: { usuario: null } });
  };

  return (
    <main className={styles.contenedor}>
      <div
        onClick={() => setShowNav(!showNav)}
        className={`${showNav && styles.overlay}`}
      ></div>
      <div
        className={`${styles.nav} ${showNav ? styles.visible : styles.hidden}`}
      >
        <NavApp elementos={nav} />
      </div>
      <form onSubmit={handleSubmit} className={styles.contenedorPrincipal}>
        <div className={styles.contenedorMenu}>
          <button className={styles.menu} onClick={() => setShowNav(!showNav)}>
            <img src="/menu_hamburguesa.svg" alt="" />
          </button>
        </div>
        <div className={styles.informacion}>
          <img className={styles.profile} src="/avatar.jpg" alt="" />
          <div className={styles.contenedorTexto}>
            <h1 className={styles.texto}>Informacion personal</h1>
            <div className={`${styles.contenedorRow} ${edit && styles.active}`}>
              <div>
                <label htmlFor="nombre" className={styles.titulo}>
                  Nombre
                </label>
                <p
                  className={`${styles.contenido} ${
                    edit ? styles.ocultar : styles.mostrar
                  }`}
                >
                  {usuario.nombre}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={usuarioEditado.nombre}
                  onChange={handleChangeUsuario}
                />
              </div>
              <div>
                <label htmlFor="email" className={styles.titulo}>
                  Email
                </label>
                <p
                  className={`${styles.contenido} ${
                    edit ? styles.ocultar : styles.mostrar
                  }`}
                >
                  {usuario.email}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangeUsuario}
                />
              </div>
              <div>
                <label htmlFor="celular" className={styles.titulo}>
                  Celular
                </label>
                <p
                  className={`${styles.contenido} ${
                    edit ? styles.ocultar : styles.mostrar
                  }`}
                >
                  {usuario.celular}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.celular}
                  type="text"
                  name="celular"
                  id="celular"
                  onChange={handleChangeUsuario}
                />
              </div>
              <div>
                <label htmlFor="direccion" className={styles.titulo}>
                  Dirección
                </label>
                <p
                  className={`${styles.contenido} ${
                    edit ? styles.ocultar : styles.mostrar
                  }`}
                >
                  {usuario.direccion}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.direccion}
                  type="text"
                  name="direccion"
                  id="direccion"
                  onChange={handleChangeUsuario}
                />
              </div>
            </div>
          </div>
          <button
            className={styles.editar}
            type="button"
            onClick={() => setEdit(!edit)}
          >
            <img className={styles.editarIcon} src="/editar_icon.png" alt="" />
          </button>
        </div>
        <div className={styles.gustos}>
          <div className={styles.preferencias}>
            <p className={styles.parrafo}>
              ¡Ingresa tus gustos personales, así nuestra IA podrá asistirte en
              tus pedidos!
            </p>
            <div className={styles.campo}>
              <label className={styles.tituloGrande} htmlFor="ingredientes">
                Ingredientes Favoritos
              </label>
              <textarea
                name="ingredientes"
                id="ingredientes"
                onChange={handleChangePreferencias}
                value={usuarioEditado.preferencia.ingredientes}
                placeholder={
                  usuarioEditado.preferencia.ingredientes !== ""
                    ? usuarioEditado.preferencia.ingredientes
                    : "Ingresa tus ingredientes favoritos..."
                }
              ></textarea>
            </div>
            <div className={styles.campo}>
              <label className={styles.tituloGrande} htmlFor="restricciones">
                Restricciones en tu dieta
              </label>
              <textarea
                name="restricciones"
                id="restricciones"
                onChange={handleChangePreferencias}
                value={usuarioEditado.preferencia.restricciones}
                placeholder={
                  usuarioEditado.preferencia.restricciones !== ""
                    ? usuarioEditado.preferencia.restricciones
                    : "Ingresa tus restricciones..."
                }
              ></textarea>
            </div>
            <div className={styles.campo}>
              <label className={styles.tituloGrande} htmlFor="expectativas">
                Expectativas
              </label>
              <textarea
                name="expectativas"
                id="expectativas"
                onChange={handleChangePreferencias}
                value={usuarioEditado.preferencia.expectativas}
                placeholder={
                  usuarioEditado.preferencia.expectativas !== ""
                    ? usuarioEditado.preferencia.expectativas
                    : "Ingresa tus expectativas..."
                }
              ></textarea>
            </div>
          </div>
          <div className={styles.categorias}>
            <p className={styles.parrafo}>Comida favoritas</p>
            <div className={styles.categoria}>
              {icons.map((categoria) => (
                <CategoryIcon
                  key={categoria.imagen}
                  categoria={categoria}
                  setCategory={() => {
                    setCategory(categoria.nombre);
                    setUsuarioEditado({
                      ...usuarioEditado,
                      preferencia: {
                        ...usuarioEditado.preferencia,
                        comidaFavorita: categoria.nombre,
                      },
                    });
                  }}
                  selected={category === categoria.nombre}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.pago}>
          <div className={styles.info}>
            <p className={styles.parrafo}>Configura tus metodos de pago</p>
            <div className={styles.contenedorInput}>
              <label className={styles.tituloGrande} htmlFor="metodo">
                Tipo tarjeta
              </label>
              <input
                className={styles.inputMetodo}
                type="text"
                name="tipoTarjeta"
                id="tipoTarjeta"
                value={usuarioEditado.metodoPago.tipoTarjeta}
                onChange={handleChangeMetodoPago}
                placeholder={
                  usuarioEditado.metodoPago.tipoTarjeta
                    ? usuarioEditado.metodoPago.tipoTarjeta
                    : "Ingresa tu metodo de pago"
                }
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.contenedorInput}>
              <label className={styles.tituloGrande} htmlFor="numero">
                Numero de tarjeta
              </label>
              <input
                className={styles.inputNumero}
                type="text"
                name="numeroTarjeta"
                id="numeroTarjeta"
                value={usuarioEditado.metodoPago.numeroTarjeta}
                onChange={handleChangeMetodoPago}
                placeholder={
                  usuarioEditado.metodoPago.numeroTarjeta
                    ? usuarioEditado.metodoPago.numeroTarjeta
                    : "Ingresa tu numero de pago"
                }
              />
            </div>
            <div className={styles.contenedorInput}>
              <label className={styles.tituloGrande} htmlFor="nombreTarjeta">
                Franquicia
              </label>
              <input
                className={styles.inputNumero}
                type="text"
                name="franquicia"
                id="franquicia"
                value={usuarioEditado.metodoPago.franquicia}
                onChange={handleChangeMetodoPago}
                placeholder={
                  usuarioEditado.metodoPago.franquicia
                    ? usuarioEditado.metodoPago.franquicia
                    : "Ingresa tu nombre de titular"
                }
              />
            </div>
            <div className={styles.contenedorInput}>
              <label className={styles.tituloGrande} htmlFor="cvv">
                CVV
              </label>
              <input
                className={styles.inputNumero}
                type="text"
                name="cvv"
                id="cvv"
                value={usuarioEditado.metodoPago.cvv}
                onChange={handleChangeMetodoPago}
                placeholder={
                  usuarioEditado.metodoPago.cvv
                    ? usuarioEditado.metodoPago.cvv
                    : "Ingresa tu CVV"
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.botones}>
          <button className={styles.boton} type="submit">
            GUARDAR
          </button>
          <Link to="/" className={styles.botonLink}>
            <button className={styles.boton} onClick={() => cerrarSesion}>
              CERRAR SESION
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}
