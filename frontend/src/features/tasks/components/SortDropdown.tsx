import { useState, useRef, useEffect } from "react";
import { FaSortAmountDown } from "react-icons/fa";

type SortOption = "recent" | "dueDate" | "estimatedTime" | "progress";

interface Props {
    selected: SortOption;
    onChange: (option: SortOption) => void;
}

const SortDropdown = ({ selected, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: { label: string; value: SortOption }[] = [
        { label: "Recent", value: "recent" },
        { label: "Due Date", value: "dueDate" },
        { label: "Estimated Time", value: "estimatedTime" },
        { label: "Progress", value: "progress" },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#FFFDF6] shadow-md rounded-full text-black font-semibold hover:scale-105 transition"
                onClick={() => setOpen((prev) => !prev)}
            >
                <FaSortAmountDown />
                Sort
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            <input
                                type="radio"
                                name="sortOption"
                                value={option.value}
                                checked={selected === option.value}
                                onChange={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
