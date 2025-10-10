import { añadirUsuario, editarUsuario } from "../peticiones/user";

// Funcion que define el state de usuarios inicial, si hay algo en local lo pone o sino vacio
const usuariosInicial = () => {
  const localStorageUsuarios = localStorage.getItem("usuarios");
  return localStorageUsuarios ? JSON.parse(localStorageUsuarios) : [];
};

// Funcion que define el state de usuario Activo inicial, si hay algo en local lo pone o sino null
const usuarioActivoInicial = () => {
  const localStorageUsuario = localStorage.getItem("usuarioActivo");
  return localStorageUsuario ? JSON.parse(localStorageUsuario) : null;
};

// Definimos el state inicial con usuarios y usuarioActivo y sus valores iniciales
export const stateInicial = {
  usuarios: usuariosInicial(),
  usuarioActivo: usuarioActivoInicial(),
};

// Definimos el reducer con su state y su action
export function usuariosReducer(state = stateInicial, action) {
  //Funcion que se ejecuta cada que se carga la pagina, llama los valores de usuarios del back y los settea en usuarios.
  if (action.type === "SET_USUARIOS") {
    return {
      ...state,
      usuarios: action.payload, // se cargan los usuarios traídos de la API
    };
  }

  // Funcion para añadir usuarios
  if (action.type === "Añadir usuario") {
    return {
      ...state,
      usuarios: action.payload.usuarios,
    };
  }

  // Funcion para definir el usuario activo
  if (action.type === "Usuario activo") {
    let usuarioActivoN=null
    if (action.payload.usuario != null) {
      // Buscamos el usuario en el state de usuarios
      usuarioActivoN = state.usuarios.find(
        (usuario) => usuario.id === action.payload.usuario.id
      );
    }
    return {
        ...state,
        usuarioActivo: usuarioActivoN,
      };
  }

  // Actualizar el usuario activo cada que se actualice su perfil
  if (action.type === "Actualizar usuarioActivo") {
    let usuario = state.usuarioActivo;
    if (state.usuarioActivo !== null) {
      usuario = state.usuarios.find(
        (usuario) => usuario.id === state.usuarioActivo.id
      );
    }
    return {
      ...state,
      usuarioActivo: usuario,
    };
  }
  return state;
}
