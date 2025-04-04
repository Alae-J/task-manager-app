import { useState, useEffect } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

interface Props {
  password: string;
  editing: boolean;
  onChange: (val: string) => void;
  onStartEdit: () => void;
}

const PasswordField = ({ password, editing, onChange, onStartEdit }: Props) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [editing]);

  const validate = (val: string) => {
    const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(val)) {
      return "Password must be at least 8 characters long and include letters, numbers, and symbols.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const err = validate(val);
    setError(err);
    onChange(val);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-[#232360] mb-1">Password</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={password}
          readOnly={!editing}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-md border ${
            editing ? (error ? "border-red-400" : "border-[#C97E4D]") : "border-[#E5E5ED]"
          } bg-white text-[#768396] text-sm`}
        />
        <span
          className="absolute right-10 top-2.5 text-[#E3C79C] cursor-pointer"
          onClick={() => setVisible((prev) => !prev)}
        >
          <FaEye />
        </span>
        <span
          className="absolute right-3 top-2.5 text-[#E3C79C] cursor-pointer"
          onClick={onStartEdit}
        >
          <FaEdit />
        </span>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default PasswordField;
