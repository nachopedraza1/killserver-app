import axios from "axios";

const killApi = axios.create({
    baseURL: '/api'
})

export default killApi;