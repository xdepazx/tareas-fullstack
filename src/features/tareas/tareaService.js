import axios from 'axios'

//const API_URL = 'http://localhost:4000/api/tareas/'
const API_URL = 'https://good-tick-jodhpurs.cyclic.app/api/tareas/'

//crear una nueva tarea
//recibe datos de tarea y token
const createTarea = async (tareaData, token) => {
    const config = {
        headers: {
            //cuando mandemos a llamar req a traves de axios, mandamos el token
            Authorization: `Bearer ${token}`
        }
    }
    // mandar a axios lo que necesita ese endpoint para que nos deje pasar
    const response = await axios.post(API_URL, tareaData, config)
    //devuelve axios los datos en data
    return response.data
}

//obtener las tareas del user logeado
const getTareas = async (token) => {
    const config = {
        headers: {
            //cuando mandemos a llamar req a traves de axios, mandamos el token
            Authorization: `Bearer ${token}`
        }
    }
    // mandar a axios lo que necesita ese endpoint para que nos deje pasar
    const response = await axios.get(API_URL, config)
    //devuelve axios los datos en data
    return response.data
}

//borrar tarea
const borrarTareas = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
//delete + id
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const tareaService = {
    createTarea,
    getTareas,
    borrarTareas
}

export default tareaService