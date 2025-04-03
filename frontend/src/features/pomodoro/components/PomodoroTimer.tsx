import { colors, SessionType } from "../../../types/pomodoro";

interface Props {
    timeLeft: number,
    isCounting: boolean,
    currentSessionType: SessionType
};

const PomodoroTimer = ({ timeLeft, currentSessionType }: Props) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const colorsTheme = colors[currentSessionType];
    
    return (
        <div className={`text-center ${colorsTheme.control} p-5`}>
            <div className="mb-4 px-4 py-2 border-2 border-current rounded-full text-lg font-medium">
                {currentSessionType}
            </div>
            <div className="text-[160px] leading-none font-light">
                <div>{minutes >= 10 ? minutes : (minutes > 0 ? "0" + minutes : "00")}</div>
                <div>{seconds >= 10 ? seconds : (seconds > 0 ? "0" + seconds : "00")}</div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
