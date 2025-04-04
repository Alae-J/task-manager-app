
export type Template = {
    bg: string;
    subBg: string;
    text: string;
    control: string;
    controlAlt: string;
    accent: string;
    border: string;
};

export type ColorPalette = Record<SessionType, Template>;

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

export const colorTemplates: Record<string, Template> = {
    red: {
        bg: "#FFF2F2",
        subBg: "#FFE9E9",
        text: "#471515",
        control: "#FF7C7C",
        controlAlt: "#FBDDDD",
        accent: "#FF7C7C",
        border: "#FFD5D5",
    },
    green: {
        bg: "#F0FFF5",
        subBg: "#E6FAEE",
        text: "#165C37",
        control: "#77E2B4",
        controlAlt: "#D9F5EA",
        accent: "#77E2B4",
        border: "#B8EAD1",
    },
    blue: {
        bg: "#F0F7FF",
        subBg: "#E6F1FC",
        text: "#0A2D4A",
        control: "#8CC2F2",
        controlAlt: "#D7EBFF",
        accent: "#8CC2F2",
        border: "#B2D8F7",
    },
    yellow: {
        bg: "#FFFBEA",
        subBg: "#FFF5CC",
        text: "#5C4A00",
        control: "#FFD05C",
        controlAlt: "#FFF1B8",
        accent: "#FFD05C",
        border: "#FFE8A3",
    },
    purple: {
        bg: "#F7F0FF",
        subBg: "#EFE3FF",
        text: "#381F63",
        control: "#C195F9",
        controlAlt: "#E3D3FB",
        accent: "#C195F9",
        border: "#D9C2F5",
    },
    orange: {
        bg: "#FFF5ED",
        subBg: "#FFE3CF",
        text: "#5F2A00",
        control: "#FFB26B",
        controlAlt: "#FFE2C5",
        accent: "#FFB26B",
        border: "#FFD3A6",
    },
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