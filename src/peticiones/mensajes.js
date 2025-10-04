import axios from "axios";

const urlBase = "http://localhost:8080/api/mensajes";

// Obtener todos los mensajes
export const obtenerMensaje = async () => {
  return (await axios.get(urlBase)).data;
};

//Crear mensajes
export const createMensaje = async (mensaje) => {
  return (await axios.post(urlBase, mensaje)).data;
};