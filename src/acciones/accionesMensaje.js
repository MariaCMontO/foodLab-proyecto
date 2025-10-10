import { createMensaje, obtenerMensaje } from "../peticiones/mensajes"

export const guardarMensaje= async(mensaje)=>{
    try{
        await createMensaje(mensaje)
        const data=await obtenerMensaje()
        console.log(data)
    }catch(error){
        console.log("Error al enviar mensaje: "+ error)
    }
}