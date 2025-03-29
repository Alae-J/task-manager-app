import { useNavigate } from "react-router-dom";

const FloatingAddButton = () => {
    const navigate = useNavigate();
    
    return (
        <div className="fixed bottom-8 right-8 z-50 group">
            {/* Tooltip */}
            <div className="absolute bottom-[5.5rem] right-1/2 translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Add Task
            </div>
        
        {/* Button */}
        <button
        onClick={() => navigate("/tasks/add")}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFF9F0] shadow-[0_3px_20px_-3px_rgba(0,0,0,0.25)] rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer"
        aria-label="Add Task"
        >
        {/* Real Plus Icon */}
        <span className="text-6xl text-[#383734] font-light leading-none">+</span>
        </button>
        </div>
    );
};

export default FloatingAddButton;
