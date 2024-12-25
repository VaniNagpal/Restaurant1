import axios from "axios";

const instance = axios.create({
    baseURL: 'restaurantbackend-delta.vercel.app',
    withCredentials: true
});


export default instance;