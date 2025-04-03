
import tomatoImage from "../../../assets/images/TokiAuthImage.png";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="w-full h-screen flex items-center justify-start">
            {/* Left Side - Form */}
            <div className="flex-1 p-20 flex flex-col items-start justify-start gap-12">
                <div className="w-full flex flex-col items-start gap-2">
                    <div className="text-[#BE893E] text-[42px] font-bold leading-[46px]">
                        Log In
                    </div>
                </div>
                <LoginForm />
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 h-full bg-[#DDE1E6]">
                <img
                    src={tomatoImage}
                    alt="Pomodoro visual"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
