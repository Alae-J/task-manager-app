import { useNavigate } from "react-router-dom";
import logo from "../assets/images/croppedPNG.png";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="sticky top-3.5 z-50 w-full bg-[#FFFDF6] shadow-[0_2px_12px_rgba(0,0,0,0.08)] rounded-[1.5rem] flex items-center justify-between px-6 py-3 max-w-7xl mx-auto mt-6">
            {/* Logo */}
            <div
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 cursor-pointer"
            >
                <img
                    src={logo}
                    alt="Toki Logo"
                    className="h-10 sm:h-12 object-contain align-middle"
                />
            </div>

            {/* Nav Links */}
            <div className="flex items-center space-x-5 text-base sm:text-lg font-[Kantumruy] text-black">
                <button onClick={() => navigate("/")} className="cursor-pointer hover:text-gray-600 transition">
                    Dashboard
                </button>
                <div className="h-6 w-[1px] bg-black opacity-20" />
                <button onClick={() => navigate("/tasks")} className="cursor-pointer hover:text-gray-600 transition">
                    Manage Tasks
                </button>
                <div className="h-6 w-[1px] bg-black opacity-20" />
                <button onClick={() => navigate("/settings")} className="cursor-pointer hover:text-gray-600 transition">
                    Settings
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
