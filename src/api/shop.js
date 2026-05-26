import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 전체 목록 조회
export const getItems = async (type = "clothes", params = {}) => {
    const res = await api.get(`/${type}`, { params });
    return res.data;
}

// 새 상품 등록
export const addItems = async (type, data) => {
    const res = await api.post(`/${type}`, data);
    return res.data;
};

// 특정 상품 상세 조회
export const getItemDetail = async (type, id) => {
    const res = await api.get(`/${type}/${id}`);
    return res.data;
}

// 상품 수정 (전체)
export const updateItems = async (type, id, data) => {
    const res = await api.put(`/${type}/${id}`, data);
    return res.data;
}

// 상품 삭제
export const deleteItem = async (type, id) => {
    const res = await api.delete(`/${type}/${id}`);
    return res.data;
}