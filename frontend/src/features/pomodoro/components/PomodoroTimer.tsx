type Props = {
    time: string;
    mode: "Focus" | "Short Break" | "Long Break";
};

const modeColors = {
    Focus: "text-[#471515]",
    "Short Break": "text-[#165C37]",
    "Long Break": "text-[#0A2D4A]",
};

const PomodoroTimer = ({ time, mode }: Props) => {
    const [minutes, seconds] = time.split(":");
    const color = modeColors[mode];
    
    return (
        <div className={`text-center ${color}`}>
            <div className="mb-4 px-4 py-2 border-2 border-current rounded-full text-lg font-medium">
                {mode}
            </div>
            <div className="text-[160px] leading-none font-light">
                <div>{minutes}</div>
                <div>{seconds}</div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
