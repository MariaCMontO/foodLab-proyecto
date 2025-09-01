import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCarritoContext } from "../../context/carritoContext";
import { useHistorialContext } from "../../context/historialContext";
import Styles from "./Payment.module.css";
import CartDetail from "../../components/CartDetail";
import CartSumary from "../../components/CartSumary";
import { useEffect, useState } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";

export default function Payment() {
  const { state: stateCarrito, dispatch: carritoDispatch } =
    useCarritoContext();
  const { dispatch: historialDispatch } = useHistorialContext();

  const productos = stateCarrito.carrito;

  const location = useLocation();
  const { ia } = location.state;
  const navigate = useNavigate();

  //Usuario registrado
  const { state: stateUsuario } = useUsuariosContext();
  const { usuarioActivo: usuario } = stateUsuario;
  const [usuarioN, setUsuarioN] = useState(usuario);
  const [pago, setPago] = useState(usuarioN.pago);
  const { state } = useUsuariosContext();
  useEffect(() => {
    const actualizado = state.usuarios.find((us) => us.id === usuario.id);
    if (actualizado) setUsuarioN(actualizado);
  }, [state.usuarios]);

  useEffect(() => {
    setPago(usuarioN.pago);
  }, [usuarioN]);

  const handleChange = (e) => {
    setPago({
      ...pago,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (stateCarrito.carrito.length >= 1 && !Object.values(pago).includes("")) {
      console.log("Compra correcta");
      historialDispatch({
        type: "Agregar al historial",
        payload: { productos, cliente: usuarioN },
      });
      carritoDispatch({ type: "Vaciar carrito" });
      navigate("/cliente", { state: { usuario: usuarioN } });
    }
  };

  return (
    <div className={Styles.cuadroPrincipal}>
      <div className={Styles.cuadroSecundario}>
        <img className={Styles.Logo} src="/Logo.png" alt="" />
        {ia ? (
          <h1 className={Styles.titulo}>¡LA IA HA GENERADO TU ORDEN!</h1>
        ) : (
          <h1 className={Styles.titulo}>¡YA CASI ESTA LISTA TU ORDEN!</h1>
        )}

        {/* Primer cuadro donde esta la primera imagen de hamburguesa y sus datos */}
        <div className={Styles.primerCuadro}>
          {stateCarrito.carrito.map((producto) => (
            <CartDetail
              producto={producto}
              historial={true}
              key={producto.id}
            />
          ))}
        </div>
        <div className={Styles.contenedorSummary}>
          <CartSumary recibo={true} />
        </div>
        {/* Cuarto cuadro donde esta el input del metodo de pago */}
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.cuartoCuadro}>
            <label htmlFor="metodo" className={Styles.texto}>
              Metodo de pago
            </label>
            <input
              className={Styles.input}
              type="text"
              id="metodo"
              name="metodo"
              value={pago.metodo}
              onChange={handleChange}
            />
          </div>
          {/* Quinto cuadro donde estan los datos de la tarjeta */}
          <div className={Styles.quintoCuadro}>
            <div className={Styles.contenedor}>
              <p className={Styles.texto}>Numero de tarjeta:</p>
              <input
                className={Styles.input}
                type="text"
                name="numero"
                value={pago.numero}
                onChange={handleChange}
              />
            </div>
            <div className={Styles.contenedor}>
              <p className={Styles.texto}>Nombre de la tarjeta:</p>
              <input
                className={Styles.input}
                type="text"
                name="nombreT"
                value={pago.nombreT}
                onChange={handleChange}
              />
            </div>
            <div className={Styles.contenedor}>
              <p className={Styles.texto}>CVV:</p>
              <input
                className={Styles.input}
                type="text"
                name="cvv"
                value={pago.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Boton para confirmar la compra */}
          <button className={Styles.boton} type="submit">
            FINALIZAR COMPRA
          </button>
        </form>
      </div>
    </div>
  );
}
