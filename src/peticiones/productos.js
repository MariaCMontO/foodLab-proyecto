import axios from "axios"

const urlBase= "http://localhost:8080/foodlab/productos"

//Obtener todos los productos
export const productosData= async () => {
    return (await axios.get(urlBase)).data
}

//Añadir producto
export const añadirProducto=async (producto) => {
    return (await axios.post(urlBase, producto)).data
}

//Editar producto
export const editarProducto= async(producto) => {
    return (await axios.put(`${urlBase}/${producto.idProducto}`,producto)).data
}

// Eliminar producto
export const eliminarProducto= async(producto) =>{
    return (await axios.delete(`${urlBase}/${producto.idProducto}`)).data
}