import axios from "axios"
const Token_Cybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOSIsIkhldEhhblN0cmluZyI6IjI0LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MDE1NjgwMDAwMCIsIm5iZiI6MTY2MTcwNjAwMCwiZXhwIjoxNjkwMzA0NDAwfQ.v3QBEWqiclIwpSJXtVil8Lu30xYH1J5FT82rQrUyv1c'
export  const api = axios.create({
    baseURL: "https://jiranew.cybersoft.edu.vn/"
})
api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        TokenCybersoft: Token_Cybersoft,
        Authorization: localStorage.getItem("@user") ? `Bearer ${JSON.parse(localStorage.getItem("@user")).accessToken}` : "",

    }
    return config
})
