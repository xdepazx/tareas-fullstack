import axios from 'axios'

//const API_URL = 'http://localhost:4000/api/users/';
const API_URL = 'https://colorful-woolens-goat.cyclic.app/api/users/'

const register = async (userData) => {

    const response = await axios.post(API_URL, userData)

    return response.data
}

//login
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout elimina lo que hay en storage, nos manda a pag login

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService