import { FaPause, FaPlay, FaForward } from "react-icons/fa";

const PomodoroControls = () => {
    return (
        <div className="flex gap-4 mt-6">
            <button className="bg-red-100 p-4 rounded-xl">
                <FaPause className="text-[#471515]" size={28} />
            </button>
            <button className="bg-red-400 p-6 rounded-2xl">
                <FaPlay className="text-[#471515]" size={28} />
            </button>
            <button className="bg-red-100 p-4 rounded-xl">
                <FaForward className="text-[#471515]" size={28} />
            </button>
        </div>
    );
};

export default PomodoroControls;
