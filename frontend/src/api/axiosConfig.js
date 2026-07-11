import axios from "axios";

const api = axios.create({
    baseURL: "https://expense-manager-uzl1.onrender.com/api/v1",
});

export default api;