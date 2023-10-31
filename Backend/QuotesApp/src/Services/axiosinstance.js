import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000/",
    headers:{
        // 'Content-Type': 'application/json',
        // 'Authorization':sessionStorage['jwt'] ? `Bearer `+sessionStorage['jwt'] : "",
    },
    });

export default axiosInstance;
