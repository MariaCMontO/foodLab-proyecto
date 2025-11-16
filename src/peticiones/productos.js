import api from "./axiosConfig";


const urlBase= "/productos"


//Obtener todos los productos
export const productosData= async () => {
    return (await api.get(urlBase)).data
}

//Añadir producto
export const añadirProducto=async (producto) => {
    console.log(localStorage.getItem("token"))
    console.log(producto)
    return (await api.post(urlBase, producto)).data
}

//Editar producto
export const editarProducto= async(producto) => {
    console.log(producto)
    console.log(producto.idProducto)
    return (await api.put(`${urlBase}/${producto.idProducto}`,producto)).data
}

// Eliminar producto
export const eliminarProducto= async(producto) =>{
    return (await api.delete(`${urlBase}/${producto.idProducto}`)).data
}