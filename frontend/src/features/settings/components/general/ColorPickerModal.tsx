import { useEffect, useRef } from "react";

interface Props {
    currentColor: string;
    onSelectColor: (color: string) => void;
    onClose: () => void;
}

const predefinedColors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
];

const ColorPickerModal = ({ currentColor, onSelectColor, onClose }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);
    
    return (
        <div
  ref={ref}
  className="absolute top-10 left-0 flex gap-3 p-3 bg-white border border-gray-300 rounded-xl shadow-lg z-50 transition-all duration-200"
>
  {predefinedColors.map((color) => (
    <div
      key={color}
      className={`w-7 h-7 rounded-full cursor-pointer transition-all duration-150 border-2
        ${color === currentColor ? "border-[#c4c4c4] scale-110" : "border-gray-200 hover:scale-105"}
      `}
      style={{ backgroundColor: color }}
      onClick={() => onSelectColor(color)}
    />
  ))}
</div>

    );
};

export default ColorPickerModal;
