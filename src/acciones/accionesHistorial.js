import {
  actualizarOrden,
  añadirOrden,
  ordenesData,
} from "../peticiones/ordenes";

export const guardarOrden = async (productos, usuario, dispatch) => {
  //Creamos la nueva orden
  const nuevaOrden = {
    userId: usuario.id,
    productos: productos.map((p) => ({
      productoId: p.idProducto,
      cantidad: p.cantidad,
      nota: p.nota,
    })),
  };
  try {
    //Guardamos en el back
    añadirOrden(nuevaOrden);
    const data = await ordenesData();
    dispatch({ type: "Agregar al historial", payload: { ordenes: data } });
  } catch (error) {
    console.log("Error en ordenes: " + error);
  }
};

export const cambiarEstado = async (orden, estado, dispatch) => {
  try {
    actualizarOrden(orden, estado);
    const data = await ordenesData();
    console.log(data)
    dispatch({ type: "Cambiar estado", payload: { ordenes: data } });
  } catch (error) {
    console.log("Error actualizar ordenes: " + error);
  }
};
