import api from "./axiosConfig";
import axios from "axios";

const urlBase = "/ordenes"; 
const urlBaseR = "/receipts"; 
const urlBase1="http://localhost:8080/api/foodlab/ordenes"


//Obtener todos las ordenes
export const ordenesData = async () => {
  return (await api.get(urlBase)).data;
};

//Obtener ordenes por usuario
export const ordenesUsuario = async (usuario) => {
  return (await api.get(`${urlBase}/${usuario.id}`)).data;
};

//Añadir orden
export const añadirOrden = async (orden) => {
  return (await api.post(urlBase, orden)).data;
};

// Actualizar estado de la orden
export const actualizarOrden = async (orden, estado) => {
  return (await api.patch(`${urlBase}/${orden.idOrder}?estado=${estado}`))
    .data;
};

//Generar PDF con receiptID
export const generarPdf = async (orden) => {
  try {
    const response = await api.get(`${urlBaseR}/${orden.factura.idReceipt}/pdf`, {
      responseType: "blob", // 👈 importante para recibir el PDF como binario
    });

    const file = new Blob([response.data], { type: "application/pdf" }); // 👈 importante
    return window.URL.createObjectURL(file);
  } catch (error) {
    console.error("Error al generar PDF:", error);
  }
};
