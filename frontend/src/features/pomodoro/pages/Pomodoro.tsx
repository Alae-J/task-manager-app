import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { SESSION_CYCLE, SESSION_DURATIONS, SessionType } from "../../../types/pomodoro";
import { useParams } from "react-router-dom";
import { useTask } from "../../../hooks/useTasks";
import { handleAddSession } from "../../../services/taskService";
import PomodoroTimer from "../components/PomodoroTimer";
import PomodoroControls from "../components/PomodoroControls";
import PomodoroTaskInfo from "../components/PomodoroTaskInfo";
import { buildUserColorPalette, getUserSettings } from "../../../services/settingsService";
import { UserSettings } from "../../../types/userSettings";

const PomodoroPage = () => {
  const { id } = useParams();
  const parsedId = id && !isNaN(Number(id)) ? parseInt(id) : null;
  const actualTask = useTask(parsedId);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [specialIndex, setSpecialIndex] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(SESSION_DURATIONS[SessionType.Focus]);
  const [hasSkipped, setHasSkipped] = useState<boolean>(true);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const userColors = buildUserColorPalette(userSettings ?? { workColor: "blue", shortBreakColor: "yellow", longBreakColor: "purple" });
  const currentColors = userColors[SESSION_CYCLE[specialIndex]];

  useEffect(() => {
    if (actualTask != undefined) {
      setCurrentTask(actualTask);
    }
  }, [id, actualTask]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const id = Number(userId);
    const fetchSettings = async () => {
      if (id !== null) {
        const settings = await getUserSettings(id);
        if (settings) {
          setUserSettings(settings);
          setTimeLeft(settings.workDuration * 60);
        }
      }
    };
    fetchSettings();
  }, [parsedId]);

  useEffect(() => {
    if (currentTask && !hasSkipped) {
      setCurrentTask({ ...currentTask, sessionsCount: currentTask.sessionsCount + 1 });
      setHasSkipped(true);
    }
  }, [specialIndex]);

  useEffect(() => {
    if (!isCounting) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          handleSessionEnd(true);
          return 0;
        }
        return prev - 1;
      });
    }, 2);

    return () => clearInterval(intervalId);
  }, [isCounting, timeLeft]);

  const handleStartPause = () => {
    setIsCounting((prev) => !prev);
  };

  const handleSessionEnd = (focusCompleted: boolean) => {
    if (SESSION_CYCLE[specialIndex] === SessionType.Focus && focusCompleted) {
      handleAddSession(parsedId ? parsedId : -1);
      setHasSkipped(false);
    }
    moveToNextSession();
  };

  const getDurationFor = (type: SessionType): number => {
    if (!userSettings) return SESSION_DURATIONS[type];
    switch (type) {
      case SessionType.Focus:
        return userSettings.workDuration * 60;
      case SessionType.ShortBreak:
        return userSettings.shortBreakDuration * 60;
      case SessionType.LongBreak:
        return userSettings.longBreakDuration * 60;
    }
  };

  const moveToNextSession = () => {
    const newSpecialIndex = (specialIndex + 1) % SESSION_CYCLE.length;
    setSpecialIndex(newSpecialIndex);
    setTimeLeft(getDurationFor(SESSION_CYCLE[newSpecialIndex]));
    if (SESSION_CYCLE[newSpecialIndex] === SessionType.Focus) setIsCounting(false);
  };

  const handleSkip = () => {
    handleSessionEnd(false);
  };

  if (!currentColors) return <div>Loading Pomodoro colors...</div>;

  return (
    <main
      className="w-11/12 max-w-[1400px] h-[75vh] mx-auto my-auto flex rounded-2xl shadow-2xl overflow-hidden"
      style={{
        backgroundColor: `${currentColors.bg}cc`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left Side - Timer & Controls */}
      <section
        className="w-1/2 flex items-center justify-center"
        style={{ backgroundColor: currentColors.bg }}
      >
        <div className="w-[40%] flex flex-col items-center justify-end h-full pb-16 gap-8">
          <PomodoroTimer 
            timeLeft={timeLeft}
            isCounting={isCounting}
            currentSessionType={SESSION_CYCLE[specialIndex]}
            colorTheme={currentColors}
          />
          <PomodoroControls
            isCounting={isCounting}
            onStartPause={handleStartPause}
            onSkip={handleSkip}
            currentSessionType={SESSION_CYCLE[specialIndex]}
            colorTheme={currentColors}
          />
        </div>
      </section>
  
      {/* Right Side - Task Info */}
      <section
        className="w-1/2 flex items-center justify-center p-8"
        style={{ backgroundColor: currentColors.subBg }}
      >
        <PomodoroTaskInfo
          task={currentTask}
          currentSessionType={SESSION_CYCLE[specialIndex]}
          colorTheme={currentColors}
          workDuration={userSettings?.workDuration ?? 50}
        />
      </section>
    </main>
  );
  
  
  
};

export default PomodoroPage;
