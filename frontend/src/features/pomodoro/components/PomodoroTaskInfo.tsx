type Task = {
    title: string;
    dueDate: string;
    hasPriority: boolean;
    sessionsCompleted: number;
    totalSessions: number;
  };
  
  type Props = {
    task: Task,
    color: {
      text: string;
      accent: string;
      bg: string;
      border: string;
    }
  };
  
  
  const PomodoroTaskInfo = ({ task, color }: Props) => {
    const today = new Date().toISOString().split("T")[0];
  
    return (
      <div className="w-full h-4/9 flex justify-center items-center mt-6">
        <div className={`w-full max-w-4xl ${color.bg} px-10 py-10 rounded-3xl shadow-inner border ${color.border}`}>
          <h2 className={`text-3xl sm:text-5xl font-bold mb-10 flex items-center justify-center gap-4 ${color.text}`}>
            {task.hasPriority && (
              <span className="w-4 h-4 rounded-full bg-red-600 inline-block" />
            )}
            {task.title}
          </h2>
  
          <div className="flex justify-center items-start gap-16 mb-10">
            <div className={`flex flex-col items-center ${color.text}`}>
              <div className={`h-[6px] w-fit ${color.accent} mb-2 rounded-full px-8 self-center`} />
              <span className="text-lg sm:text-xl font-semibold">
                Today: {today}
              </span>
            </div>
  
            <div className={`flex flex-col items-center ${color.text}`}>
              <div className={`h-[6px] w-fit ${color.accent} mb-2 rounded-full px-8 self-center`} />
              <span className="text-lg sm:text-xl font-semibold">
                DueDate: {task.dueDate}
              </span>
            </div>
          </div>
  
          <div className={`text-center text-2xl sm:text-3xl font-bold ${color.text}`}>
            {task.sessionsCompleted} out of {task.totalSessions} sessions completed!
          </div>
        </div>
      </div>
    );
  };
  
  
  export default PomodoroTaskInfo;
  