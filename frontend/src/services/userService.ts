import axios from "axios";
import { User } from "../types/user";
import api from "./api";


const baseAPI = "/user";

export const handleChangeCredentials = async (userId: number, user: User) => {
    try {
        const { data } = await api.put<User>(`${baseAPI}/${userId}`, user);
        return data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const messages = err.response?.data.detail || err.message;
            const status = err.response?.data.status || err.message;
            console.log(messages, status);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
    }
}

export const getUserById = async (userId: number) => {
    try {
        const { data: response } = await api.get<User>(`${baseAPI}/${userId}`);
        return response;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Axios error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
        return null;
    }
}