import usuariosData from "../data/usuarios.json";

const usuariosInicial = () => {
  const localStorageUsuarios = localStorage.getItem("usuarios");
  return localStorageUsuarios ? JSON.parse(localStorageUsuarios) : usuariosData;
};

const usuarioActivoInicial = () => {
  const localStorageUsuario = localStorage.getItem("usuarioActivo");
  return localStorageUsuario ? JSON.parse(localStorageUsuario) : null;
};

export const stateInicial = {
  usuarios: usuariosInicial(),
  usuarioActivo: usuarioActivoInicial(),
};

export function usuariosReducer(state = stateInicial, action) {
  if (action.type === "Añadir usuario") {
    console.log("Estas en añadir usuario");
    const usuarioNuevo = state.usuarios.find(
      (usuario) => usuario.id === action.payload.usuario.id
    );
    const usuarioCompleto = { ...action.payload.usuario };
    let nuevoUsuarios = [];

    if (!usuarioNuevo) {
      nuevoUsuarios = [...state.usuarios, usuarioCompleto];
    } else {
      nuevoUsuarios = state.usuarios.map((usuario) => {
        if (usuario.id === action.payload.usuario.id) {
          return action.payload.usuario;
        } else {
          return usuario;
        }
      });
    }

    return {
      ...state,
      usuarios: nuevoUsuarios,
    };
  }
  if (action.type === "Usuario activo") {
    console.log("Desde usuario activo");
    const usuarioActivoN = state.usuarios.find(
      (usuario) => usuario.id === action.payload.usuario.id
    );
    return {
      ...state,
      usuarioActivo: usuarioActivoN,
    };
  }
  if (action.type === "Actualizar usuarioActivo") {
    let usuario= state.usuarioActivo;
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
