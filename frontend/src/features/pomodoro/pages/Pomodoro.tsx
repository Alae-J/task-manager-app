import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { colors, SESSION_CYCLE, SESSION_DURATIONS, SessionType } from "../../../types/pomodoro";
import { useParams } from "react-router-dom";
import { useTask } from "../../../hooks/useTasks";
import { handleAddSession } from "../../../services/taskService";
import PomodoroTimer from "../components/PomodoroTimer";
import PomodoroControls from "../components/PomodoroControls";
import PomodoroTaskInfo from "../components/PomodoroTaskInfo";

const PomodoroPage = ()  => {
  const { id } = useParams();
  const parsedId = id && !isNaN(Number(id)) ? parseInt(id) : null;
  const actualTask = useTask(parsedId);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [specialIndex, setSpecialIndex] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(SESSION_DURATIONS[SessionType.Focus]);
  const [hasSkipped, setHasSkipped] = useState<boolean>(true);

  // ...fetch task
  useEffect(() => {
    if (actualTask != undefined) {
      setCurrentTask(actualTask);
    }
  }, [id, actualTask]);

  // UseEffect for session completion / skip
  useEffect(() => {
    // refetch the updated task info from the backend (the sessions number count... cuz when the specialIndex changes, that number may change in case the user completed a focus session)
    if (currentTask && !hasSkipped) {
      setCurrentTask({ ...currentTask, sessionsCount: currentTask.sessionsCount + 1 });
      setHasSkipped(true);
    }    
  }, [specialIndex]);

  // UseEffect for timer, etc.
  useEffect(() => {
    // if not counting, do nothing
    if (!isCounting) return;

    // create an interval that decrements timeLeft each second
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        // If it hits 0, end the session
        if (prev <= 1) {
          clearInterval(intervalId);
          handleSessionEnd(true);
          return 0;
        };
        // if there is still time left, decrement the timeLeft
        return prev - 1;
      });
    }, 1);

    // clear interval everytime a session changes
    return () => clearInterval(intervalId);
  }, [isCounting, timeLeft])

  const handleStartPause = () => {
    setIsCounting((prev) => !prev);
  };

  const handleSessionEnd = (focusCompleted: boolean) => {
    // If the previous session was focus and it wasn't skipped => update backend
    if (SESSION_CYCLE[specialIndex] == SessionType.Focus && focusCompleted) {
      handleAddSession(parsedId ? parsedId : -1);
      setHasSkipped(false);
    }
    // Then move to next session
    moveToNextSession();
  };

  const moveToNextSession = () => {
    // increment specialIndex, set timeLeft, auto-start if break
    const newSpecialIndex = (specialIndex + 1) % 8;
    setSpecialIndex(newSpecialIndex);
    setTimeLeft(SESSION_DURATIONS[SESSION_CYCLE[newSpecialIndex]]);
    if (SESSION_CYCLE[newSpecialIndex] == SessionType.Focus) setIsCounting(false);
  };

  const handleSkip = () => {
    handleSessionEnd(false);
  };

  return (
    <main className="w-11/12 max-w-[1400px] h-[75vh] mx-auto my-auto flex rounded-2xl shadow-2xl overflow-hidden"
    style={{
      backgroundColor: `${colors[SESSION_CYCLE[specialIndex]].bg}cc`, // Add transparency
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}>
      <section className="w-1/3 flex flex-col items-center justify-center" style={{ backgroundColor: colors[SESSION_CYCLE[specialIndex]].bg }}>
        <PomodoroTimer 
          timeLeft={timeLeft}
          isCounting={isCounting}
          currentSessionType={SESSION_CYCLE[specialIndex]}
        />
        <PomodoroControls
          isCounting={isCounting}
          onStartPause={handleStartPause}
          onSkip={handleSkip}
          currentSessionType={SESSION_CYCLE[specialIndex]}
        />
      </section>

      <section className="w-2/3 flex flex-col items-center justify-center" style={{ backgroundColor: colors[SESSION_CYCLE[specialIndex]].subBg }}>
        <PomodoroTaskInfo
          task={currentTask}
          currentSessionType={SESSION_CYCLE[specialIndex]}
        />
      </section>
    </main>
  );
}

export default PomodoroPage;
