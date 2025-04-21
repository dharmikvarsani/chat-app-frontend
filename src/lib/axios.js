import axios from 'axios'


 export const axiosInstnce = axios.create({
    baseURL: ' http://localhost:5001/api',
    withCredentials: true,
})