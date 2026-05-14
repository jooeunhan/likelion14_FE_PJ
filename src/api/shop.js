import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getItems = async (type = "clothes", params = {}) => {
    const res = await api.get(`/${type}`, { params });
    return res.data;
}

export const addItems = async (type, data) => {
    const res = await api.post(`/${type}`, data);
    return res.data;
};

export const getItemDetail = async (type, id) => {
    const res = await api.get(`/${type}/${id}`);
    return res.data;
}

export const updateItems = async (type, id, data) => {
    const res = await api.put(`/${type}/${id}`, data);
    return res.data;
}