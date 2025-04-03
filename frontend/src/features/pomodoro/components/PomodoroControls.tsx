import { FaPlay, FaPause, FaForward } from "react-icons/fa";
import { colors, SessionType } from "../../../types/pomodoro";

interface Props {
    isCounting: boolean,
    onStartPause: () => void,
    currentSessionType: SessionType,
    onSkip: () => void
  }
  

const PomodoroControls = ({ isCounting, onStartPause, currentSessionType, onSkip }: Props) => {
  const colorsTheme = colors[currentSessionType];
    
  return (
    <div className="p-5 flex gap-4 mt-6">
      {/* Three Dots Button */}
      <button
        style={{ backgroundColor: colorsTheme.controlAlt, color: colorsTheme.text }}
        className="cursor-pointer pb-7 px-5 py-4 rounded-xl text-3xl font-bold leading-none flex items-center justify-center"
      >
        ...
      </button>

      {/* Play / Pause Button */}
      <button
        onClick={onStartPause}
        style={{ backgroundColor: colorsTheme.control }}
        className="cursor-pointer px-8 py-6 rounded-2xl flex items-center justify-center"
      >
        {isCounting ? (
          <FaPause style={{ color: colorsTheme.text }} size={28} />
        ) : (
          <FaPlay style={{ color: colorsTheme.text }} size={28} />
        )}
      </button>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        style={{ backgroundColor: colorsTheme.controlAlt }}
        className="cursor-pointer px-5 py-4 rounded-xl flex items-center justify-center"
      >
        <FaForward style={{ color: colorsTheme.text }} size={28} />
      </button>
    </div>
  );
};



export default PomodoroControls;
