import api from "./axiosConfig";

const urlBase = "/mensajes";

// Obtener todos los mensajes
export const obtenerMensaje = async () => {
  return (await api.get(urlBase)).data;
};

//Crear mensajes
export const createMensaje = async (mensaje) => {
  return (await api.post(urlBase, mensaje)).data;
};