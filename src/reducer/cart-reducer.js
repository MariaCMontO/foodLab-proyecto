//Creamos el carrito inicial con local storage
const carritoInicial = () => {
  const localStorageCart=localStorage.getItem('carrito')
    return localStorageCart ? JSON.parse(localStorageCart) : []
};

//State inicial
export const stateInicial = {
  carrito: carritoInicial(),
};

//Creamos el reducer
export const carritoReducer = (state = stateInicial, action) => {
  if (action.type === "Añadir al carrito") {
    //Verificar si ya existe el producto en el carrito
    const indiceProducto = state.carrito.findIndex(
      (producto) => producto.idProducto === action.payload.producto.idProducto
    );

    let copiaCarrito = [...state.carrito];

    if (indiceProducto < 0) {
      const nuevoProducto = { ...action.payload.producto, cantidad: 1, nota:"" };
      copiaCarrito = [...state.carrito, nuevoProducto];
    }

    return {
      ...state,
      carrito: copiaCarrito,
    };
  }

  if (action.type === "Eliminar producto") {
    //Filtrar el producto del carrito
    const copiaCarrito = [...state.carrito];
    const nuevoCarrito = copiaCarrito.filter(
      (producto) => producto.idProducto !== action.payload.producto.idProducto
    );

    return {
      ...state,
      carrito: nuevoCarrito,
    };
  }

  if (action.type === "Añadir cantidad") {
    //Buscar el producto
    const producto = state.carrito.find(
      (producto) => producto.idProducto === action.payload.producto.idProducto
    );

    let nuevoCarrito = [];

    if (producto) {
      nuevoCarrito = state.carrito.map((item) => {
        if (item.idProducto === action.payload.producto.idProducto) {
          return { ...item, cantidad: item.cantidad + 1 };
        } else {
          return { ...item };
        }
      });
    }

    return {
      ...state,
      carrito: nuevoCarrito,
    };
  }

  if (action.type === "Disminuir cantidad") {
    //Buscar el indice donde se encuentra el producto
    const producto = state.carrito.find(
      (producto) => producto.idProducto === action.payload.producto.idProducto
    );
    
    let nuevoCarrito = [];

    if (producto.cantidad === 1) {
        console.log("La cantidad es 0");
        nuevoCarrito = state.carrito.filter(
            (producto) => producto.idProducto != action.payload.producto.idProducto
        );
        return {
            ...state,
            carrito: nuevoCarrito,
        };
    }
    
    if (producto) {
      nuevoCarrito = state.carrito.map((item) => {
        if (item.idProducto === action.payload.producto.idProducto) {
          return { ...item, cantidad: item.cantidad - 1 };
        } else {
          return { ...item };
        }
      });
    }

    return {
      ...state,
      carrito: nuevoCarrito,
    };
  }

  if (action.type === "Vaciar carrito") {
    return {
      ...state,
      carrito: [],
    };
  }

  if(action.type=== 'Agregar nota'){
    //Buscar el indice donde se encuentra el producto
    const producto = state.carrito.find(
      (producto) => producto.idProducto === action.payload.producto.idProducto
    );

    let nuevoCarrito = [];

    if (producto) {
      nuevoCarrito = state.carrito.map((item) => {
        if (item.idProducto === action.payload.producto.idProducto) {
          return { ...item, nota: action.payload.nota };
        } else {
          return { ...item };
        }
      });
    }

    return {
      ...state,
      carrito: nuevoCarrito,
    };
  }

  return state;
};
