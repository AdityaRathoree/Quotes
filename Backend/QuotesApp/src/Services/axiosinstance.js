import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000/",
    headers:{
        'Content-Type': 'application/json',
        'Authorization':sessionStorage.getItem('token') ? sessionStorage['token'] : "",
    },
    });

const axiosInstanceUploadImg = axios.create({
        baseURL:"http://localhost:7000/",
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization':sessionStorage.getItem('token') ? sessionStorage['token'] : "",
        },
        });

const axiosInstanceDispImg = axios.create({
        baseURL:"http://localhost:7000/",
        headers:{
            'Content-Type': 'application/json',
            'Authorization':sessionStorage.getItem('token') ? sessionStorage['token'] : "",
        },
        responseType: 'blob', 
        });    

export {axiosInstance,axiosInstanceUploadImg,axiosInstanceDispImg};
