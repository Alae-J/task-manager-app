import { SessionType, Template } from "../../../types/pomodoro";
import { Task } from "../../../types/task";

interface Props {
    task: Task | null;
    currentSessionType: SessionType;
    colorTheme: Template;
    workDuration: number;
}

const PomodoroTaskInfo = ({ task, colorTheme, workDuration }: Props) => {
    const today = new Date().toISOString().split("T")[0];
    const totalSessions = task &&  Math.ceil(task.estimatedTime * 60 / (workDuration));

    return (
        <div className="p-4 w-full h-4/9 flex justify-center items-center mt-6">
            <div className={`w-full max-w-4xl ${colorTheme.bg} px-10 py-10 rounded-3xl shadow-inner border ${colorTheme.border}`}>
                <h2 className={`text-3xl sm:text-5xl font-bold mb-10 flex items-center justify-center gap-4 ${colorTheme.text}`}>
                    {task?.hasPriority && <span className="w-4 h-4 rounded-full bg-red-600 inline-block" />}
                    {task?.title}
                </h2>

                <div className="flex justify-center items-start gap-16 mb-10">
                    <div className={`flex flex-col items-center ${colorTheme.text}`}>
                        <div className={`h-[6px] w-fit ${colorTheme.accent} mb-2 rounded-full px-8 self-center`} />
                        <span className="text-lg sm:text-xl font-semibold">Today: {today}</span>
                    </div>

                    <div className={`flex flex-col items-center ${colorTheme.text}`}>
                        <div className={`h-[6px] w-fit ${colorTheme.accent} mb-2 rounded-full px-8 self-center`} />
                        <span className="text-lg sm:text-xl font-semibold">DueDate: {task?.dueDate}</span>
                    </div>
                </div>

                <div className={`text-center text-2xl sm:text-3xl font-bold ${colorTheme.text}`}>
                    {task?.sessionsCount} out of {totalSessions} sessions completed!
                </div>
            </div>
        </div>
    );
};


export default PomodoroTaskInfo;
