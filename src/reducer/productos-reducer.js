import productosData from "../data/productData.json";

const productosIniciales = () => {
  const localStorageProductos = localStorage.getItem("productos");
  return localStorageProductos
    ? JSON.parse(localStorageProductos)
    : productosData;
};

export const stateInicial = {
  productos: productosIniciales(),
};

export const productosReducer = (state = stateInicial, action) => {
  if (action.type === "Añadir producto") {
    const nuevoProducto = state.productos.find(
      (producto) => producto.id === action.payload.producto.id
    );

    let nuevoProductos = [];
    if (nuevoProducto) {
      nuevoProductos = state.productos.map((producto) => {
        if (producto.id === action.payload.producto.id) {
          return action.payload.producto;
        } else {
          return producto;
        }
      });
    } else {
        nuevoProductos=[...state.productos, action.payload.producto]
    }
    return {
      ...state,
      productos: nuevoProductos,
    };
  }
  if(action.type==='Eliminar producto'){
    const nuevoProductos=state.productos.filter((producto)=> producto.id!== action.payload.producto.id)

    return {
      ...state,
      productos: nuevoProductos,
    };
  }
  return state
};
