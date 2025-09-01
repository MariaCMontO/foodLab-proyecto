import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import NavApp from "../../components/NavApp";
import CategoryIcon from "../../components/CategoryIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IaLoader from "./IaLoader";
import { useUsuariosContext } from "../../context/usuariosContext";

export default function Profile() {
  //Usuario registrado
  const {state: stateUsuario, dispatch: dispatchUsuarios}= useUsuariosContext()
  const {usuarioActivo: usuario}= stateUsuario
  const [usuarioN, setUsuarioN] = useState(usuario);
  //Loader de IA
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigateIA = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/iaPortal");
    }, 1500);
  };
  const nav = [
    {
      nombre: "Menu",
      imagen: "/menu_icon.svg",
      link: "/cliente",
      usuario: usuario,
    },
    {
      nombre: "Historial",
      imagen: "/historial_icon.svg",
      link: "/historial",
      usuario: usuario,
    },
    {
      nombre: "Perfil",
      imagen: "/perfil_icon.svg",
      link: "/perfil",
      usuario: usuario,
    },
    {
      nombre: "IA",
      imagen: "/ia_icon.png",
      link: "/iaPortal",
      custom: handleNavigateIA,
    },
  ];

  const icons = [
    { nombre: "Hamburguesas", imagen: "/icon_hamburguesa.svg" },
    { nombre: "Perros", imagen: "/icon_hot_dog.png" },
    { nombre: "Pizzas", imagen: "/icon_pizza.svg" },
  ];
  
  const [usuarioEditado, setUsuarioEditado] = useState(usuarioN);
  const [showNav, setShowNav] = useState(false);
  const [category, setCategory] = useState(usuarioEditado.favorita);
  const [edit, setEdit] = useState(false);

  const { state, dispatch } = useUsuariosContext();
  
  useEffect(() => {
    const actualizado = state.usuarios.find((us) => us.id === usuario.id);
    if (actualizado) setUsuarioN(actualizado);
  }, [state.usuarios]);

  useEffect(() => {
    setUsuarioEditado(usuarioN);
  }, [usuarioN]);

  useEffect(() => {
    setCategory(usuarioEditado.favorita);
  }, [usuarioN]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["metodo", "numero", "nombreT", "cvv"].includes(name)) {
      //Si el campo pertenece a pago
      setUsuarioEditado({
        ...usuarioEditado,
        pago: {
          ...usuarioEditado.pago,
          [name]: value, // actualiza dentro de pago
        },
      });
    } else {
      //Si el campo es normal
      setUsuarioEditado({
        ...usuarioEditado,
        [name]: value,
      });
    }
    console.log(usuarioEditado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioCreado = {
      ...usuarioEditado,
    };

    dispatch({ type: "Añadir usuario", payload: { usuario: usuarioCreado } });
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
          <img className={styles.logo} src="/Logo.png" alt="" />
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
                  {usuarioN.nombre}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={usuarioEditado.nombre}
                  onChange={handleChange}
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
                  {usuarioN.email}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
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
                  {usuarioN.celular}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.celular}
                  type="text"
                  name="celular"
                  id="celular"
                  onChange={handleChange}
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
                  {usuarioN.direccion}
                </p>
                <input
                  className={`${styles.inputNumero} ${
                    edit ? styles.mostrar : styles.ocultar
                  }`}
                  value={usuarioEditado.direccion}
                  type="text"
                  name="direccion"
                  id="direccion"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button className={styles.editar} onClick={() => setEdit(!edit)}>
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
                onChange={handleChange}
                value={usuarioEditado.ingredientes}
                placeholder={
                  usuarioN.ingredientes !== ""
                    ? usuarioN.ingredientes
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
                onChange={handleChange}
                value={usuarioEditado.restricciones}
                placeholder={
                  usuarioN.restricciones !== ""
                    ? usuarioN.restricciones
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
                onChange={handleChange}
                value={usuarioEditado.expectativas}
                placeholder={
                  usuarioN.expectativas !== ""
                    ? usuarioN.expectativas
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
                      favorita: categoria.nombre,
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
                Método de pago
              </label>
              <input
                className={styles.inputMetodo}
                type="text"
                name="metodo"
                id="metodo"
                value={usuarioEditado.pago.metodo}
                onChange={handleChange}
                placeholder={
                  usuarioN.pago.metodo !== ""
                    ? usuarioN.pago.metodo
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
                name="numero"
                id="numero"
                value={usuarioEditado.pago.numero}
                onChange={handleChange}
                placeholder={
                  usuarioN.pago.numero !== ""
                    ? usuarioN.pago.numero
                    : "Ingresa tu numero de pago"
                }
              />
            </div>
            <div className={styles.contenedorInput}>
              <label className={styles.tituloGrande} htmlFor="nombre">
                Nombre en tarjeta
              </label>
              <input
                className={styles.inputNumero}
                type="text"
                name="nombreT"
                id="nombre"
                value={usuarioEditado.pago.nombreT}
                onChange={handleChange}
                placeholder={
                  usuarioN.pago.nombreT !== ""
                    ? usuarioN.pago.nombreT
                    : "Ingresa tu nombre de titular del pago"
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
                value={usuarioEditado.pago.cvv}
                onChange={handleChange}
                placeholder={
                  usuarioN.pago.cvv !== ""
                    ? usuarioN.pago.cvv
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
            <button className={styles.boton}>CERRAR SESION</button>
          </Link>
        </div>
      </form>
      {loading && <IaLoader />}
    </main>
  );
}
