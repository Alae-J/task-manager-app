import { useEffect, useRef, useState } from "react";
import PomodoroControls from "../components/PomodoroControls";
import PomodoroTaskInfo from "../components/PomodoroTaskInfo";
import PomodoroTimer from "../components/PomodoroTimer";
import { useParams } from "react-router-dom";
import { useTask } from "../../../hooks/useTasks";
import { Task } from "../../../types/task";
import { PomodoroSession } from "../../../types/pomodoro";
import { createPomodoroSession, fetchLatestPomodoroSession, fetchTaskTimeSpent } from "../../../services/pomodoroService";

const PomodoroPage = () => {
    const [task, setTask] = useState<Task>({
        "id": 4,
        "title": "Build Pomodoro Timer UI",
        "description": "Implement the timer logic and visual countdown for each Pomodoro block.",
        "hasPriority": true,
        "dueDate": "2025-03-29",
        "estimatedTime": 90,
        "timeSpent": 0,
        "completed": false,
        "status": "TO_DO",
        "updatedAt": "2025-03-28T15:05:00",
    });
    const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);
    const { id } = useParams();
    const parsedId = id && !isNaN(Number(id)) ? parseInt(id) : null;
    const actualTask = useTask(parsedId);
    type Mode = "Focus" | "Short Break" | "Long Break";

    useEffect(() => {
            if (actualTask != undefined) {
                setTask(actualTask);
            }
        }, [id, actualTask])

    const durations: Record<Mode, number> = {
        "Focus": 25 * 60,
        "Short Break": 5 * 60,
        "Long Break": 15 * 60,
    };

    const colors: Record<Mode, {
        bg: string;
        subBg: string;
        text: string;
        control: string;
        controlAlt: string;
        accent: string;
        border: string;
    }> = {
        "Focus": {
            bg: "#FFF2F2",
            subBg: "#FFE9E9",
            text: "#471515",
            control: "#FF7C7C",
            controlAlt: "#FBDDDD",
            accent: "#FF7C7C",
            border: "#FFD5D5"
        },
        "Short Break": {
            bg: "#F0FFF5",
            subBg: "#e6faee",
            text: "#165C37",
            control: "#77E2B4",
            controlAlt: "#D9F5EA",
            accent: "#77E2B4",
            border: "#B8EAD1"
        },
        "Long Break": {
            bg: "#F0F7FF",
            subBg: "#e6f1fc",
            text: "#0A2D4A",
            control: "#8CC2F2",
            controlAlt: "#D7EBFF",
            accent: "#8CC2F2",
            border: "#B2D8F7"
        }
    };
    

    const pomodoroCycle: Mode[] = [
        "Focus",
        "Short Break",
        "Focus",
        "Short Break",
        "Focus",
        "Short Break",
        "Focus",
        "Long Break",
    ];

    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [chronos, setChronos] = useState(durations["Focus"]);

    const mode = pomodoroCycle[count];
    const intervalRef = useRef<number | null>(null);

    const formatTime = (time: number) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (isRunning && chronos > 0) {
          intervalRef.current = window.setInterval(() => {
            setChronos((prev) => {
              const updated = prev - 1;
              if (currentSession?.sessionType === "FOCUS") {
                setCurrentSession((prevSession) =>
                  prevSession ? { ...prevSession, duration: prevSession.duration + 1 } : null
                );
              }
              return updated;
            });
          }, 1000);
        }
        return () => clearInterval(intervalRef.current!);
      }, [isRunning, currentSession]);

      useEffect(() => {
        if (chronos === 0 && currentSession) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
      
          // Update session backend
          createPomodoroSession(task.id, {
            ...currentSession,
            active: false
          });
      
          // Update task time spent
          fetchTaskTimeSpent(task.id).then(setTimeSpent => {
            setTask(prev => ({
              ...prev,
              timeSpent: setTimeSpent
            }));
          });
      
          const next = (count + 1) % pomodoroCycle.length;
          setCount(next);
          setChronos(durations[pomodoroCycle[next]]);
          setCurrentSession(null);
        }
      }, [chronos]);

      useEffect(() => {
        if (!parsedId) return;
        fetchLatestPomodoroSession(parsedId).then((last) => {
          if (last && last.active && last.sessionType === "FOCUS") {
            const now = new Date();
            const secondsPassed = Math.floor((now.getTime() - start.getTime()) / 1000);
            const remaining = durations["Focus"] - (last.duration ?? secondsPassed);
            setCurrentSession(last);
            setChronos(remaining);
          }
        });
      }, [parsedId]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
    };
    const handleSkip = () => {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        const next = (count + 1) % pomodoroCycle.length;
        setCount(next);
        setChronos(durations[pomodoroCycle[next]]);
    };

    const startFocusSession = async () => {
        const newSession: PomodoroSession = {
          sessionType: "FOCUS",
          active: true,
          duration: 0
        };
      
        const created = await createPomodoroSession(task.id, newSession);
        if (created) {
          setCurrentSession(created);
          setChronos(durations["Focus"]);
          setIsRunning(true);
        }
      };

    const currentColors = colors[mode];

    return (
        <main
        className="flex w-screen h-screen min-h-screen"
        style={{ backgroundColor: currentColors.bg }}
        >
        <section
            className="w-1/3 flex flex-col items-center justify-center"
            style={{ backgroundColor: currentColors.bg }}
        >
            <PomodoroTimer time={formatTime(chronos)} mode={mode} />
            <PomodoroControls
                isRunning={isRunning}
                onStart={handleStart}
                onPause={handlePause}
                onSkip={handleSkip}
                color={currentColors}
            />
        </section>

        <section
            className="w-2/3 flex flex-col items-center justify-center"
            style={{ backgroundColor: currentColors.subBg }}
        >
            <PomodoroTaskInfo task={task} color={{
                text: currentColors.text,
                accent: currentColors.accent,
                bg: currentColors.subBg,
                border: currentColors.border
            }} />

        </section>
        </main>
    );
};

export default PomodoroPage;
