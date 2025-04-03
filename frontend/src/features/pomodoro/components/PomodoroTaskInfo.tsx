import { colors, SESSION_DURATIONS, SessionType } from "../../../types/pomodoro";
import { Task } from "../../../types/task";


interface Props {
  task: Task | null
  currentSessionType: SessionType
};
  
  
const PomodoroTaskInfo = ({ task, currentSessionType }: Props) => {
  const colorsTheme = colors[currentSessionType];
  const today = new Date().toISOString().split("T")[0];
  const totalSessions = task && task.estimatedTime * 60 / (SESSION_DURATIONS[SessionType.Focus] / 60);

  return (
    <div className="p-4 w-full h-4/9 flex justify-center items-center mt-6">
      <div className={`w-full max-w-4xl ${colorsTheme.bg} px-10 py-10 rounded-3xl shadow-inner border ${colorsTheme.border}`}>
        <h2 className={`text-3xl sm:text-5xl font-bold mb-10 flex items-center justify-center gap-4 ${colorsTheme.text}`}>
          {task && task.hasPriority && (
            <span className="w-4 h-4 rounded-full bg-red-600 inline-block" />
          )}
          {task && task.title}
        </h2>

        <div className="flex justify-center items-start gap-16 mb-10">
          <div className={`flex flex-col items-center ${colorsTheme.text}`}>
            <div className={`h-[6px] w-fit ${colorsTheme.accent} mb-2 rounded-full px-8 self-center`} />
            <span className="text-lg sm:text-xl font-semibold">
              Today: {today}
            </span>
          </div>

          <div className={`flex flex-col items-center ${colorsTheme.text}`}>
            <div className={`h-[6px] w-fit ${colorsTheme.accent} mb-2 rounded-full px-8 self-center`} />
            <span className="text-lg sm:text-xl font-semibold">
              DueDate: {task && task.dueDate}
            </span>
          </div>
        </div>

        <div className={`text-center text-2xl sm:text-3xl font-bold ${colorsTheme.text}`}>
          {task && task.sessionsCount} out of {totalSessions} sessions completed!
        </div>
      </div>
    </div>
  );
};


export default PomodoroTaskInfo;
