
export interface PomodoroSession {
    sessionType: "FOCUS" | "SHORT_BREAK" | "LONG_BREAK";
    duration?: number; // optional until session ends
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}
