import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import tareaService from "./tareaService"

const initialState = {
    tareas: [],
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

//crear nueva tarea
export const createTarea = createAsyncThunk('tareas/create', async (tareaData, thunkAPI) => {
    try {
        //BUSCAR TOKEN ANTES DE LLAMARLO    
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.createTarea(tareaData, token)
    } catch (error) {
        // si el backend lanza error
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

//mostrar las tareas del usuario
export const getTareas = createAsyncThunk('tareas/getAll', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.getTareas(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

//borrar
export const borrarTareas = createAsyncThunk('tareas/borrar', async(id, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.borrarTareas(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

export const tareaSlice = createSlice({
    name: 'tarea',
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTarea.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createTarea.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //agregamos al array con metodo push
            state.tareas.push(action.payload)
        })
        .addCase(createTarea.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTareas.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getTareas.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //devuelve array
            state.tareas= action.payload
        })
        .addCase(getTareas.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(borrarTareas.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(borrarTareas.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //devuelve array
            state.tareas= state.tareas.filter((tarea) => tarea._id !== action.payload.id)
        })
        .addCase(borrarTareas.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
}) 

export const {reset} = tareaSlice.actions
export default tareaSlice.reducer