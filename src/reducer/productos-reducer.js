import { añadirProducto, editarProducto, eliminarProducto, productosData } from "../peticiones/productos";

// Funcion que define el estado inicial del state, si hay algo en el local lo toma  o sino un arreglo vacio
const productosIniciales = () => {
  const localStorageProductos = localStorage.getItem("productos");
  return localStorageProductos ? JSON.parse(localStorageProductos) : [];
};

// Definimos el state inicial
export const stateInicial = {
  productos: productosIniciales(),
};

//Definimos le reducer con state y action
export const productosReducer = (state = stateInicial, action) => {
  //Funcion que se ejecuta cada que se carga la pagina, llama los valores de productos del back y los settea en usuarios.
  if (action.type === "SET_PRODUCTOS") {
    return {
      ...state,
      productos: action.payload, // se cargan los usuarios traídos de la API
    };
  }

  // Funcion que añade un producto si no existe, y lo edita si ya existe.
  if (action.type === "Añadir producto") {
    return {
      ...state,
      productos: action.payload.productos,
    };
  }

  // Funcion que elimina productos
  if (action.type === "Eliminar producto") {
    return {
      ...state,
      productos: action.payload.productos,
    };
  }
  return state;
};
