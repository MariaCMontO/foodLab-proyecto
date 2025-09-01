import { createContext, useContext, useEffect, useReducer } from "react";
import { productosReducer, stateInicial } from "../reducer/productos-reducer";

//Crear context
const ProductosContext = createContext(null);

//Crear provider
export function ProductosProvider({ children }) {
  const [state, dispatch] = useReducer(productosReducer, stateInicial);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(state.productos));
  }, [state.productos]);

  return (
    <ProductosContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductosContext.Provider>
  );
}

//Hook para usar el context

export function useProductosContext(){
    const context=useContext(ProductosContext)

    if(!context){
        throw new Error('useCarrito debe usarse dentro de ProductosProvider')
    }

    return context;
}