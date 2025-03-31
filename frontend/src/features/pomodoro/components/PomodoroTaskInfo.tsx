type Task = {
    id: number;
    title: string;
    dueDate: string;
    hasPriority: boolean;
    sessionsCompleted: number;
    totalSessions: number;
};

type Props = {
    task: Task;
};

const PomodoroTaskInfo = ({ task }: Props) => {
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="text-[#471515] text-center px-10">
            <h2 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4">
            {task.hasPriority && (
                <span className="w-4 h-4 rounded-full bg-red-600 inline-block" />
            )}
            {task.title}
            </h2>
    
            <div className="flex justify-center gap-16 text-2xl font-semibold mb-8">
            <div>
                <div className="border-t-4 border-[#FF7C7C] pt-4">
                Today: {today}
                </div>
            </div>
            <div>
                <div className="border-t-4 border-[#FF7C7C] pt-4">
                DueDate: {task.dueDate}
                </div>
            </div>
            </div>
    
            <div className="text-3xl font-bold">
            {task.sessionsCompleted} out of {task.totalSessions} sessions completed!
            </div>
        </div>
    );
};

export default PomodoroTaskInfo;
