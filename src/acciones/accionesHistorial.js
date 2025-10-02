import {
  actualizarOrden,
  añadirOrden,
  generarPdf,
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
    console.log(data);
    dispatch({ type: "Cambiar estado", payload: { ordenes: data } });
  } catch (error) {
    console.log("Error actualizar ordenes: " + error);
  }
};

export const mostrarPdf = async (orden) => {
  try {
    const fileURL = await generarPdf(orden);
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe src="${fileURL}" width="100%" height="100%" style="border:none;"></iframe>`
    );
  } catch (error) {
    console.error("Error al generar PDF:", error);
  }
};
