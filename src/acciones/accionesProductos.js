import {
  añadirProducto,
  editarProducto,
  eliminarProducto,
  productosData,
} from "../peticiones/productos";

export const guardarProductos = async (dispatch, state, producto) => {
  //Buscar el producto
  const nuevoProducto = state.productos.find(
    (prod) => prod.idProducto === producto.idProducto
  );
  try {
    //Si el producto existe lo edita
    if (nuevoProducto) {
      // Guarda el base de datos
      await editarProducto(producto);
      // Si no lo añade
    } else {
      // Guarda en la base de datos
      const productoN = {
        categoria: producto.categoria,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
      };
      await añadirProducto(productoN);
    }
    const data = await productosData();
    dispatch({ type: "Añadir producto", payload: { productos: data } });
  } catch (error) {
    console.log("Error en productos: " + error);
  }
};

export const eliminarProductoA = async (dispatch, producto) => {
  try {
    // Eliminar de la base de datos
    await eliminarProducto(producto);
    const data = await productosData();
    dispatch({ type: "Eliminar producto", payload: { productos: data } });
  } catch (error) {
    console.log("Error al eliminar producto: " + error);
  }
};
