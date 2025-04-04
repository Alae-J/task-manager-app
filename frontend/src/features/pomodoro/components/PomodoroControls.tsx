import { FaPlay, FaPause, FaForward } from "react-icons/fa";
import { SessionType, Template } from "../../../types/pomodoro";

interface Props {
  isCounting: boolean;
  onStartPause: () => void;
  currentSessionType: SessionType;
  onSkip: () => void;
  colorTheme: Template;
}

const PomodoroControls = ({ isCounting, onStartPause, onSkip, colorTheme }: Props) => {
  return (
    <div className="p-5 flex gap-4">

      {/* Play / Pause Button */}
      <button
        onClick={onStartPause}
        style={{ backgroundColor: colorTheme.control }}
        className="cursor-pointer px-8 py-6 rounded-2xl flex items-center justify-center"
      >
        {isCounting ? (
          <FaPause style={{ color: colorTheme.text }} size={28} />
        ) : (
          <FaPlay style={{ color: colorTheme.text }} size={28} />
        )}
      </button>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        style={{ backgroundColor: colorTheme.controlAlt }}
        className="cursor-pointer px-5 py-4 rounded-xl flex items-center justify-center"
      >
        <FaForward style={{ color: colorTheme.text }} size={28} />
      </button>
    </div>
  );
};

export default PomodoroControls;
