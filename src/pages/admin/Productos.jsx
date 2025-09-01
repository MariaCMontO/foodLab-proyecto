import { useEffect, useRef, useState } from "react";
import NavApp from "../../components/NavApp";
import styles from "./Productos.module.css";
import CategoryIcon from "../../components/CategoryIcon";
import { useHelpers } from "../../hooks/useHelpers";
import { useProductosContext } from "../../context/productosContext";

export default function Productos() {
  const nav = [
    { nombre: "Ordenes", imagen: "/menu_icon.svg", link: "/ordenesAdmin" },
    {
      nombre: "Productos",
      imagen: "/historial_icon.svg",
      link: "/productosAdmin",
    },
    {
      nombre: "Historial",
      imagen: "/perfil_icon.svg",
      link: "/historialAdmin",
    },
  ];

  const icons = [
    { nombre: "Hamburguesas", imagen: "/icon_hamburguesa.svg" },
    { nombre: "Perros", imagen: "/icon_hot_dog.png" },
    { nombre: "Pizzas", imagen: "/icon_pizza.svg" },
  ];

  const [showNav, setShowNav] = useState(false);
  const [category, setCategory] = useState();

  const { formatoCOP } = useHelpers();

  const { state, dispatch } = useProductosContext();

  const [productoForm, setProductoForm] = useState({
    id: 0,
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
  });

  //Formulario
  const handleChange = (e) => {
    setProductoForm({
      ...productoForm,
      [e.target.id]: e.target.value,
      categoria: category ? category : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(productoForm).includes("")) {
      const nuevoProducto = {
        ...productoForm,
      };
      dispatch({
        type: "Añadir producto",
        payload: { producto: nuevoProducto },
      });
    } else {
      console.log("Hay espacios vacios");
    }
    setProductoForm({
      id: 0,
      categoria: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      imagen: "",
    });
    setCategory(null);
    setImage(null);
  };

  const eliminarProducto = (producto) => {
    dispatch({
      type: "Eliminar producto",
      payload: { producto },
    });
  };

  const editarProducto = (producto) => {
    setProductoForm({
      id: producto.id,
      categoria: producto.categoria,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
    });

    setCategory(producto.categoria);
    setImage(producto.imagen || null);
  };

  //Imagen que se arrastra al input
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setProductoForm({ ...productoForm, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef(null);

  const handleClickDropArea = () => {
    fileInputRef.current.click();
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
      <div className={styles.contenedorPrincipal}>
        <div className={styles.contenedorMenu}>
          <button className={styles.menu} onClick={() => setShowNav(!showNav)}>
            <img src="/menu_hamburguesa.svg" alt="" />
          </button>
          <img className={styles.logo} src="/Logo.png" alt="" />
        </div>
        <form className={styles.contenedorRegistro} onSubmit={handleSubmit}>
          <p className={styles.registrarTexto}>REGISTRAR PRODUCTO</p>
          <div className={styles.nombre}>
            <label className={styles.label} htmlFor="id">
              Id
            </label>
            <input
              value={productoForm.id}
              onChange={handleChange}
              className={styles.input}
              type="number"
              id="id"
              name="id"
            />
            <label className={styles.label} htmlFor="nombre">
              Nombre
            </label>
            <input
              value={productoForm.nombre}
              onChange={handleChange}
              className={styles.input}
              type="text"
              id="nombre"
              name="nombre"
            />
            <label className={styles.label} htmlFor="precio">
              Precio
            </label>
            <input
              value={productoForm.precio}
              onChange={handleChange}
              className={styles.input}
              type="text"
              id="precio"
              name="precio"
            />
          </div>
          <div className={styles.categorias}>
            <p className={styles.label}>Categoria</p>
            {icons.map((categoria) => (
              <CategoryIcon
                key={categoria.imagen}
                categoria={categoria}
                setCategory={() => {
                  setCategory(categoria.nombre);
                  setProductoForm({
                    ...productoForm,
                    categoria: categoria.nombre,
                  });
                }}
                selected={category === categoria.nombre}
                registro={true}
              />
            ))}
          </div>
          <div className={styles.descripcion}>
            <label className={styles.label} htmlFor="descripcion">
              Descripcion
            </label>
            <textarea
              value={productoForm.descripcion}
              onChange={handleChange}
              type="text"
              className={styles.inputDescripcion}
              name="descripcion"
              id="descripcion"
            ></textarea>
          </div>
          <div className={styles.imagenBoton}>
            <div
              className={styles.imagen}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={handleClickDropArea}
            >
              <label className={styles.label} htmlFor="imagen">
                Imagen
              </label>
              {image ? (
                <img
                  className={styles.imagenDropped}
                  src={image}
                  alt="preview"
                />
              ) : (
                <div>
                  <img
                    className={styles.dropImage}
                    src="/dropImage.png"
                    alt="preview"
                  />
                  <p className={styles.label}>Arrastra tu imagen aqui</p>
                </div>
              )}
              <input
                type="file"
                name="imagen"
                id="imagen"
                hidden
                onChange={handleFile}
                ref={fileInputRef}
              />
            </div>
            <button type="submit" className={styles.boton}>
              GUARDAR
            </button>
          </div>
        </form>
        <div className={styles.scrollTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {state.productos.map((producto) => (
                <tr key={producto.id} className={styles.fila}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{formatoCOP.format(producto.precio)}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.descripcion}</td>
                  <td className={styles.iconos}>
                    <button
                      onClick={() => eliminarProducto(producto)}
                      className={styles.botonIcon}
                    >
                      <img
                        className={styles.icon}
                        src="/close_icon.png"
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => editarProducto(producto)}
                      className={styles.botonIcon}
                    >
                      <img
                        className={styles.icon}
                        src="/editar_icon.png"
                        alt=""
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
