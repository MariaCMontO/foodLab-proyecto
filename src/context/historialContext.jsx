import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { historialReducer, stateInicial } from "../reducer/historial-reducer";
import { ordenesData } from "../peticiones/ordenes";

//Creamos el context
const HistorialContext = createContext(null);

//Creamos el provider

export function HistorialProvider({ children }) {
  const [state, dispatch] = useReducer(historialReducer, stateInicial);

  // Cada que cambie el historial de ordenes se settea en local Storage
  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(state.historial));
  }, [state.historial]);

  //Al arrancar la app se guardar todos los datos de orden del back
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await ordenesData(); // petición a la API
        dispatch({
          type: "SET_ORDENES",
          payload: data,
        });
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <HistorialContext.Provider value={{ state, dispatch }}>
      {children}
    </HistorialContext.Provider>
  );
}

//Hook para usar el context
export function useHistorialContext() {
  const context = useContext(HistorialContext);

  if (!context) {
    throw new Error("useCarrito debe usarse dentro de HistorialProvider");
  }

  return context;
}
