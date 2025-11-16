import {
  añadirUsuario,
  buscarPorCorreoConstraseña,
  editarUsuario,
  usuarioData,
} from "../peticiones/user";

export const guardarUsuario = async (dispatch, state, usuario) => {
  try {
    // Busca si el usuario ya existe en el state de usuarios
    const usuarioNuevo = state.usuarios.find((us) => us.id === usuario.id);
    // Si el usuario nuevo no existe..
    if (!usuarioNuevo) {
      // Guardamos en la back
      await añadirUsuario(usuario);
      // Si el usuario ya existe...
    } else {
      // Guardamos la edicion de ese usuario en el back
      await editarUsuario(usuario);
    }
    //Traemos el arreglo del back
    const data = await usuarioData();
    dispatch({ type: "Añadir usuario", payload: { usuarios: data } });
  } catch (error) {
    console.log("Error en añadir/editar usuarios: " + error);
  }
};



export const buscarPorEmailyContraseña = async (usuario) => {
  const usuarioC = {
    email: usuario.email,
    password: usuario.contraseña,
  }
  try {
    return await buscarPorCorreoConstraseña(usuarioC);
  } catch (error) {
    console.error("Error al intentar loggear: ", error);
  }
};
