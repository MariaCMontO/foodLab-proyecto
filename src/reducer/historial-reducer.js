//Creamos el estado inicial con local storage
const historialInicial = () => {
  const localStorageHistorial = localStorage.getItem("historial");
  return localStorageHistorial ? JSON.parse(localStorageHistorial) : [];
};

//State inicial
export const stateInicial = {
  historial: historialInicial(),
};

//Creamos el reducer
export const historialReducer = (state = stateInicial, action) => {
  //Funcion que se ejecuta cada que se carga la pagina, llama los valores de ordenes del back y los settea en historial.
  if (action.type === "SET_ORDENES") {
    return {
      ...state,
      historial: action.payload, // se cargan las ordenes traídos de la API
    };
  }
  // Accion que agrega una orden al historial
  if (action.type === "Agregar al historial") {
    return {
      ...state,
      historial: action.payload.ordenes,
    };
  }

  // Accion que cambia el estado de una orden
  if (action.type === "Cambiar estado") {
    return {
      ...state,
      historial: action.payload.ordenes,
    };
  }

  return state;
};
