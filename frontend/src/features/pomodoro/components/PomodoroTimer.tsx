import { SessionType, Template } from "../../../types/pomodoro"; // <- import Template

interface Props {
    timeLeft: number;
    isCounting: boolean;
    currentSessionType: SessionType;
    colorTheme: Template; // <- add this
}

const PomodoroTimer = ({ timeLeft, currentSessionType, colorTheme }: Props) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className={`text-center ${colorTheme.control} p-5`}>
            <div className="mb-4 px-4 py-2 border-2 border-current rounded-full text-lg font-medium">
                {currentSessionType}
            </div>
            <div className="text-[160px] leading-none font-light">
                <div>{minutes >= 10 ? minutes : `0${minutes}`}</div>
                <div>{seconds >= 10 ? seconds : `0${seconds}`}</div>
            </div>
        </div>
    );
};

export default PomodoroTimer
