import axios from "axios"

const urlBase="http://localhost:8080/foodlab/usuarios"

// Obtener todos los usuarios
export const usuarioData = async () => {
    return (await axios.get(urlBase)).data
}

// Añadir usuario
export const añadirUsuario= async (usuario) =>{
    return (await axios.post(urlBase, usuario)).data
}

// Editar usuario
export const editarUsuario= async (usuario) => {
    return (await axios.put(`${urlBase}/${usuario.id}`, usuario)).data
}

// Buscar por email y contraseña
export const buscarPorCorreoConstraseña= async (correo, contraseña) => {
    return (await axios.get(`${urlBase}/login?email=${correo}&password=${contraseña}`)).data
}