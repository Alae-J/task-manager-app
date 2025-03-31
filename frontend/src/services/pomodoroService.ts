import axios from "axios";
import { PomodoroSession } from "../types/pomodoro";

export const createPomodoroSession = async (taskId: number, session: PomodoroSession) => {
  try {
    const response = await axios.post<PomodoroSession>(`/api/pomodoro/task/${taskId}`, session);
    return response.data;
  } catch (error) {
    console.error("Failed to create Pomodoro session", error);
    return null;
  }
};

export const fetchLatestPomodoroSession = async (taskId: number) => {
  try {
    const response = await axios.get<PomodoroSession>(`/api/pomodoro/task/${taskId}/latest`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest pomodoro session", error);
    return null;
  }
};

export const fetchTaskTimeSpent = async (taskId: number) => {
  try {
    const response = await axios.get<number>(`/api/pomodoro/task/${taskId}/timeSpent`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch time spent", error);
    return 0;
  }
};
