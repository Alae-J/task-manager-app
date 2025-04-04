import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

interface Props {
  label: string;
  value: string;
  icon: "edit";
  iconType?: "text" | "email";
  editing: boolean;
  onChange: (newValue: string) => void;
  onStartEdit: () => void;
}

const EditableField = ({
  label,
  value,
  iconType = "text",
  editing,
  onChange,
  onStartEdit,
}: Props) => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError(""); // clear on edit switch
  }, [editing]);

  const validate = (val: string) => {
    if (iconType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) return "Please enter a valid email address.";
    }
    if (label.toLowerCase() === "username" && val.length > 20) {
      return "Username must not exceed 20 characters.";
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
      <label className="text-sm font-semibold text-[#232360] mb-1">{label}</label>
      <div className="relative">
        <input
          type={iconType}
          value={value}
          readOnly={!editing}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-md border ${
            editing ? (error ? "border-red-400" : "border-[#C97E4D]") : "border-[#E5E5ED]"
          } bg-white text-[#768396] text-sm`}
        />
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

export default EditableField;
