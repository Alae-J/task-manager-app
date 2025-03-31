import PomodoroControls from "../components/PomodoroControls";
import PomodoroTaskInfo from "../components/PomodoroTaskInfo";
import PomodoroTimer from "../components/PomodoroTimer";

const PomodoroPage = () => {
    
    const mockTask = {
        id: 1,
        title: "Build Pomodoro Timer UX",
        dueDate: "2025-03-31",
        hasPriority: true,
        sessionsCompleted: 2,
        totalSessions: 4,
    };
    
    return (
        <main className="flex min-h-screen">
        
            <section className="w-1/3 bg-[#FFF2F2] flex flex-col items-center justify-center">
                <PomodoroTimer time="25:00" mode="Focus" />
                <PomodoroControls />
            </section>
            
            <section className="w-2/3 bg-[#fff0f0] flex flex-col items-center justify-center">
                <PomodoroTaskInfo task={mockTask} />
            </section>
        </main>
    );
};

export default PomodoroPage;