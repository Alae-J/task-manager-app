import axios from "axios";
import { UserSettings } from "../types/userSettings";
import api from "./api";
import { colorTemplates, SessionType, Template } from "../types/pomodoro";

const baseAPI = "/settings/user";

export const updateUserSettings = async (userId: number, userSettings: UserSettings) => {
    try {
        const { data } = await api.put<UserSettings>(`${baseAPI}/${userId}`, userSettings);
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

export const getUserSettings = async (userId: number) => {
    try {
        const { data: response } = await api.get<UserSettings>(`${baseAPI}/${userId}`);
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

export const buildUserColorPalette = (userSettings: {
    workColor: string;
    shortBreakColor: string;
    longBreakColor: string;
}): Record<SessionType, Template> =>  {
    return {
        [SessionType.Focus]: colorTemplates[userSettings.workColor],
        [SessionType.ShortBreak]: colorTemplates[userSettings.shortBreakColor],
        [SessionType.LongBreak]: colorTemplates[userSettings.longBreakColor],
    };
}
