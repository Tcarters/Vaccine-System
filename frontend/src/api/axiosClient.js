import axios from "axios";
import queryString from 'query-string'


const baseurl ='http://127.0.0.0:3000/api/'
const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: baseurl,
  paramsSerializer: params => queryString.stringify({ params })  

})

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${getToken()} `
        }
    }
})

axiosClient.interceptors.response.use( (response) => {
    if ( response && response.data) return response.data
    return response

}, (err) => {
    if (!err.response) {
        alert('Err! Networkd err! ')
    } 
    throw err
})

export default axiosClient