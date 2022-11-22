import axios from 'axios'

const API_URL = '/api/users/'


// Register user
const register = async (userData) => {
    // Make the request to API_URL and saves userData response
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data
    // axios.post(url,data).then((response) => { axios.post(instrumentUrl, response.data.filename)})
}

// Login user
const login = async (userData) => {
    // Make the request to API_URL and saves userData response
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))

    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService