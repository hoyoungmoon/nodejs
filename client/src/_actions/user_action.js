import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export function loginUser(dataToSubmit) {
    // const request = axios.post('http://13.125.149.206/api/user/login', dataToSubmit)
    //     .then(response => response.data)
    axios.defaults.withCredentials = true;
    const request = axios.post('http://localhost:80/api/user/login', dataToSubmit)
        .then(response => response.data)

        console.log(request)
    return {
        type: LOGIN_USER, payload: request
    }
}

export function registerUser(dataToSubmit) {
    // const request = axios.post('http://13.125.149.206/api/user', dataToSubmit)
    //     .then(response => response.data)
    const request = axios.post('http://localhost:80/api/user', dataToSubmit)
    .then(response => response.data)
        console.log(request)
    return {
        type: REGISTER_USER, payload: request
    }
}

export function auth() {
    // const request = axios.post('http://13.125.149.206/api/user', dataToSubmit)
    //     .then(response => response.data)
    const request = axios.get('http://localhost:80/api/user/auth')
    .then(response => response.data)
        console.log(request)
    return {
        type: AUTH_USER, payload: request
    }
}