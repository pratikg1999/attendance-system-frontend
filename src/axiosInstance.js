import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api"
    // baseURL: "http://192.168.43.68:5000/api"
})
export default axiosInstance;