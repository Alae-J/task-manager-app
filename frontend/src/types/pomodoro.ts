export enum SessionType {
    Focus = "FOCUS",
    ShortBreak = "SHORT_BREAK",
    LongBreak = "LONG_BREAK"
}

export const SESSION_CYCLE: SessionType[] = [
    SessionType.Focus,
    SessionType.ShortBreak,
    SessionType.Focus,
    SessionType.ShortBreak,
    SessionType.Focus,
    SessionType.ShortBreak,
    SessionType.Focus,
    SessionType.LongBreak
];

export const SESSION_DURATIONS: Record<SessionType, number> = {
    [SessionType.Focus]: 50 * 60,
    [SessionType.ShortBreak]: 10 * 60,
    [SessionType.LongBreak]: 30 * 60
};

export const colors: Record<SessionType, {
        bg: string,
        subBg: string,
        text: string,
        control: string,
        controlAlt: string,
        accent: string,
        border: string
    }> = {
        [SessionType.Focus]: {
            bg: "#FFF2F2",
            subBg: "#FFE9E9",
            text: "#471515",
            control: "#FF7C7C",
            controlAlt: "#FBDDDD",
            accent: "#FF7C7C",
            border: "#FFD5D5"
        },
        [SessionType.ShortBreak]: {
            bg: "#F0FFF5",
            subBg: "#e6faee",
            text: "#165C37",
            control: "#77E2B4",
            controlAlt: "#D9F5EA",
            accent: "#77E2B4",
            border: "#B8EAD1"
        },
        [SessionType.LongBreak]: {
            bg: "#F0F7FF",
            subBg: "#e6f1fc",
            text: "#0A2D4A",
            control: "#8CC2F2",
            controlAlt: "#D7EBFF",
            accent: "#8CC2F2",
            border: "#B2D8F7"
        }
};