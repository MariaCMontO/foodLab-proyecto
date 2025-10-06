import { createContext, useContext, useEffect, useReducer } from "react";
import { productosReducer, stateInicial } from "../reducer/productos-reducer";
import { productosData } from "../peticiones/productos";

//Crear context
const ProductosContext = createContext(null);

//Crear provider
export function ProductosProvider({ children }) {
  const [state, dispatch] = useReducer(productosReducer, stateInicial);

  // Cada que cambie el state de productos los guarda en el local
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(state.productos));
  }, [state.productos]);

    //Al arrancar la app se guardar todos los datos de producto del back
     useEffect(() => {
      const fetchProductos = async () => {
        try {
          const data = await productosData(); // petición a la API
          dispatch({
            type: "SET_PRODUCTOS",
            payload: data,
          });
        } catch (error) {
          console.error("Error cargando productos:", error);
        }
      };
  
      fetchProductos();
    }, []);

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