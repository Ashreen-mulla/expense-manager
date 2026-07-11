import api from "../api/axiosConfig";

export const getDashboard = async () => {
    const response = await api.get("/analytics/dashboard");
    return response.data;
};

export const getMonthlySpending = async () => {
    const response = await api.get("/analytics/monthly-spending");
    return response.data;
};

export const getCategorySpending = async () => {
    const response = await api.get("/analytics/category-spending");
    return response.data;
};

export const getRecentExpenses = async () => {
    const response = await api.get("/analytics/recent-expenses");
    return response.data;
};

export const getBiggestExpense = async () => {
    const response = await api.get("/analytics/biggest-expense");
    return response.data;
};