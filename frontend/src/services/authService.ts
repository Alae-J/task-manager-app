import api from "./api";

const baseAPI = "/auth";

export const login = async (email: string, password: string) => {
    const res = await api.post(`${baseAPI}/login`, { email, password });
    return res.data;
};

export const register = async (email: string, password: string) => {
    const res = await api.post(`${baseAPI}/register`, { email, password });
    return res.data;
};
