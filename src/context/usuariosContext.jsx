import { createContext, useContext, useEffect, useReducer } from "react";
import { stateInicial, usuariosReducer } from "../reducer/user-reducer";

const UsuariosContext = createContext(null);

export function UsuariosProvider({ children }) {
  const [state, dispatch] = useReducer(usuariosReducer, stateInicial);

  useEffect(
    () => localStorage.setItem("usuarios", JSON.stringify(state.usuarios)),
    [state.usuarios]
  );

  useEffect(() => {
    localStorage.setItem("usuarioActivo", JSON.stringify(state.usuarioActivo));
  }, [state.usuarioActivo]);

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
