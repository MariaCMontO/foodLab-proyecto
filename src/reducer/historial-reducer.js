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
  if (action.type === "Agregar al historial") {
    const nuevaOrden = {
      id:crypto.randomUUID().substring(0,5),
      productos: action.payload.productos,
      cliente: action.payload.cliente,
      estado: "Confirmada",
      fecha:new Date().toLocaleDateString()
    };

    const nuevoHistorial = [...state.historial, nuevaOrden];
    
    return {
      ...state,
      historial: nuevoHistorial,
    };
  }

  if(action.type==='Cambiar estado'){
    const ordenNueva=state.historial.find((orden)=> orden.id===action.payload.orden.id)
    console.log('Entro a cambiar estado')

    let nuevoHistorial=[]

    if(ordenNueva){
      nuevoHistorial=state.historial.map((orden) => {
        if(orden.id=== ordenNueva.id){
          return {...orden, estado:action.payload.estado}
        }else{
          return {...orden}
        }
      })
    }

    console.log(nuevoHistorial)
    return {
      ...state,
      historial: nuevoHistorial
    }
  }

  return state;
};
