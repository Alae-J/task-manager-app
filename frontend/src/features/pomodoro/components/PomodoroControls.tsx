import { FaPlay, FaPause, FaForward } from "react-icons/fa";

interface Props {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onSkip: () => void;
    color: {
      bg: string;
      subBg: string;
      text: string;
      control: string;
      controlAlt: string; // ← now expected
    };
  }
  

const PomodoroControls = ({ isRunning, onStart, onPause, onSkip, color }: Props) => {
    return (
        <div className="flex gap-4 mt-6">
  {/* Three Dots Button */}
  <button
    style={{ backgroundColor: color.controlAlt, color: color.text }}
    className="cursor-pointer px-5 py-4 rounded-xl text-3xl font-bold leading-none flex items-center justify-center"
  >
    ...
  </button>

  {/* Play / Pause Button */}
  <button
    onClick={isRunning ? onPause : onStart}
    style={{ backgroundColor: color.control }}
    className="cursor-pointer px-8 py-6 rounded-2xl flex items-center justify-center"
  >
    {isRunning ? (
      <FaPause style={{ color: color.text }} size={28} />
    ) : (
      <FaPlay style={{ color: color.text }} size={28} />
    )}
  </button>

  {/* Skip Button */}
  <button
    onClick={onSkip}
    style={{ backgroundColor: color.controlAlt }}
    className="cursor-pointer px-5 py-4 rounded-xl flex items-center justify-center"
  >
    <FaForward style={{ color: color.text }} size={28} />
  </button>
</div>

    );
};



export default PomodoroControls;
