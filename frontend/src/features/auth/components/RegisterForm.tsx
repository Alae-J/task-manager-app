import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string,
    id: number
}

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email.trim()) return "Email is required.";
        if (!password.trim()) return "Password is required.";
        if (password.length < 8) return "Password must be at least 8 characters long.";
        if (password !== confirmPassword) return "Passwords do not match.";
        return null;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        try {
            const token = await register(email, password);
            localStorage.setItem("token", token);
            const decoded: JwtPayload = jwtDecode(token);
            localStorage.setItem("userId", decoded.id.toString());
            navigate("/");
        } catch (err: unknown) {
            console.error("Registration error:", err);
            alert("Registration failed. Try again later.");
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="w-full flex flex-col items-start gap-4"
        >
            {/* Email */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="text-[#B98741] text-sm">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 py-3 bg-[#F2F4F8] border-b border-[#C1C7CD] outline-none"
                    required
                />
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="password" className="text-[#B98741] text-sm">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 py-3 bg-[#F2F4F8] border-b border-[#C1C7CD] outline-none"
                    required
                />
            </div>

            {/* Confirm Password */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-[#B98741] text-sm">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 px-4 py-3 bg-[#F2F4F8] border-b border-[#C1C7CD] outline-none"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="cursor-pointer w-full h-12 bg-[#CCA369] text-white font-medium tracking-wide outline-2 outline-[#D0A771] outline-offset-[-2px] hover:brightness-105 hover:scale-105 transition-transform duration-200"
            >
                Sign Up
            </button>

            {/* Divider */}
            <hr className="w-full border-t border-[#DDE1E6]" />

            {/* Already have an account */}
            <p className="text-[#C75825] text-sm">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="cursor-pointer underline"
                >
                    Log In
                </span>
            </p>
        </form>
    );
};

export default RegisterForm;
