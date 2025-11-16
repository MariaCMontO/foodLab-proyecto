import api from "./axiosConfig";
import axios from "axios";

const urlBase = "/usuarios";
const urlBase1 = "http://localhost:8080/api/foodlab/usuarios";

// Obtener todos los usuarios
export const usuarioData = async () => {
  return (await api.get(urlBase)).data;
};

// Añadir usuario
export const añadirUsuario = async (usuario) => {
  return (await api.post(urlBase, usuario)).data;
};

// Editar usuario
export const editarUsuario = async (usuario) => {
  console.log(usuario)
  console.log(usuario.id)
  return (await api.put(`${urlBase}/${usuario.id}`, usuario)).data;
};

// Buscar por email y contraseña
export const buscarPorCorreoConstraseña = async (usuario) => {
  return (await api.post(`${urlBase}/login`, usuario)).data;
};
