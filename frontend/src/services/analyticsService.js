import api from "../api/axiosConfig";

export const getDashboard = async () => {
    const response = await api.get("/analytics/dashboard");
    return response.data;
};