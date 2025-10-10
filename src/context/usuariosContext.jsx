import { createContext, useContext, useEffect, useReducer } from "react";
import { stateInicial, usuariosReducer } from "../reducer/user-reducer";
import { usuarioData } from "../peticiones/user";

const UsuariosContext = createContext(null);

export function UsuariosProvider({ children }) {
  const [state, dispatch] = useReducer(usuariosReducer, stateInicial);


  //Al arrancar la app se guardar todos los datos de usuario del back
   useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await usuarioData(); // petición a la API
        dispatch({
          type: "SET_USUARIOS",
          payload: data,
        });
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Cada que cambie el state de usuarios se guarda en local
  useEffect(
    () => localStorage.setItem("usuarios", JSON.stringify(state.usuarios)),
    [state.usuarios]
  );

  // Cada que cambie el usuarioActivo de guarda en local
  useEffect(() => {
    localStorage.setItem("usuarioActivo", JSON.stringify(state.usuarioActivo));
  }, [state.usuarioActivo]);

  // Cada que cambie el state de usuarios, mirar si el usuario activo de editó y volver a setear esos valores en usuarioActivo
  useEffect(() => {
    dispatch({type:'Actualizar usuarioActivo'});
  }, [state.usuarios]);


  return (
    <UsuariosContext.Provider value={{ state, dispatch }}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuariosContext() {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error("useCarrito debe usarse dentro de UsuariosProvider");
  }

  return context;
}
