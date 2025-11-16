  import CategoryIcon from "../../components/CategoryIcon";
  import NavApp from "../../components/NavApp";
  import styles from "./AppClient.module.css";
  import ProductDetail from "./ProductDetail";
  import CartDetail from "../../components/CartDetail";
  import CartSumary from "../../components/CartSumary";
  import { useCarritoContext } from "../../context/carritoContext";
  import { useEffect, useState } from "react";
  import ProductModal from "./ProductModal";
  import NotaModal from "./NotaModal";
  import { useHistorialContext } from "../../context/historialContext";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useProductosContext } from "../../context/productosContext";
  import IaLoader from "./IaLoader";
  import { useUsuariosContext } from "../../context/usuariosContext";
  import { iconsI, navCliente } from "../../data/helpers";

  export default function AppClient() {
    //Usuario registrado
    const {state}= useUsuariosContext()
    const {usuario}=state
    const icons = iconsI
    const nav = navCliente()
    //Estados
    const { state: stateCarrito, dispatch } = useCarritoContext();
    const [category, setCategory] = useState();
    const [showNav, setShowNav] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [modal, setModal] = useState(null);
    const [notaModal, setNotaModal] = useState(null);
    const { state: stateProductos } = useProductosContext();

    return (
      <main className={styles.contenedor}>
        <div
          onClick={() => setShowNav(!showNav)}
          className={`${showCart && styles.overlay} ${showNav && styles.overlay}`}
        ></div>
        <div
          className={`${styles.nav} ${showNav ? styles.visible : styles.hidden}`}
        >
          <NavApp elementos={nav} />
        </div>
        <div className={styles.contenedorPrincipal}>
          <div className={styles.contenedorSecundario}>
            <div className={styles.contenedorNav}>
              <button
                className={styles.menu}
                onClick={() => setShowNav(!showNav)}
              >
                <img src="/menu_hamburguesa.svg" alt="" />
              </button>
              <div className={styles.categoria}>
                {icons.map((categoria) => (
                  <CategoryIcon
                    key={categoria.nombre}
                    categoria={categoria}
                    setCategory={setCategory}
                    selected={category === categoria.nombre}
                  />
                ))}
              </div>
              <button
                className={styles.botonCarrito}
                onClick={() => setShowCart(!showCart)}
              >
                <img src="/cart_icon.svg" alt="" />
              </button>
            </div>
            <div className={styles.productContainer}>
              {stateProductos.productos
                .filter((producto) => {
                  if (!category) return true;
                  return producto.categoria === category;
                })
                .map((product, index) => (
                  <ProductDetail
                    key={`${product.idProducto}-${index}`}
                    producto={product}
                    setModal={setModal}
                  />
                ))}
            </div>
          </div>
          <div
            className={`${styles.contenedorCarrito} ${
              showCart ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.logosCarrito}>
              <img className={styles.logo} src="/Logo.png" alt="" />
              <button
                className={styles.cerrarCarrito}
                onClick={() => setShowCart(!showCart)}
              >
                <img
                  className={styles.cerrarCarritoImagen}
                  src="/close_icon.png"
                  alt=""
                />
              </button>
            </div>
            <div className={styles.contenedorFlex}>
              <p className={styles.texto}>ORDEN</p>
              <button
                onClick={() => dispatch({ type: "Vaciar carrito" })}
                className={styles.vaciarBoton}
              >
                Vaciar carrito
              </button>
            </div>
            <div className={styles.carrito}>
              {stateCarrito.carrito.map((producto, index) => (
                <CartDetail
                  key={`${producto.id}-${index}`}
                  producto={producto}
                  setNotaModal={setNotaModal}
                  notaModal={notaModal}
                />
              ))}
            </div>
            <div className={styles.resumen}>
              <CartSumary
              usuario={usuario}
              />
            </div>
          </div>
        </div>
        {modal && <ProductModal producto={modal} setModal={setModal} />}
        {notaModal && (
          <NotaModal setNotaModal={setNotaModal} notaModal={notaModal} />
        )}
      </main>
    );
  }
