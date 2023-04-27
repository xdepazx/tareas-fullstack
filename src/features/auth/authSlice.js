import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// funct para obtener el user del localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // saber si el user se autenticó
    // user siempre loged in, sino buscar user
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//registrar user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        //solo responde los datos
        return await authService.register(user)
    } catch (error) {
        // si el backend lanza error
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

//login 
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //recibe el estado y lo resetea
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //al estado le pongo datos del usuario que esta devolviendo mi funcion
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //al estado le pongo datos del usuario que esta devolviendo mi funcion
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer