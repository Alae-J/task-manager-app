import { useState } from "react";
import ColorPickerModal from "./ColorPickerModal";

type ColorField = "work" | "shortBreak" | "longBreak";

interface Props {
    themeColors: {
      work: string;
      shortBreak: string;
      longBreak: string;
    };
    onColorPick: (field: "work" | "shortBreak" | "longBreak", color: string) => void;
  }
  

const ThemeSettings = ({ themeColors, onColorPick }: Props) => {
  const [activeField, setActiveField] = useState<ColorField | null>(null);

  const handleColorSelect = (field: ColorField, color: string) => {
    onColorPick(field, color);
    setActiveField(null);
  };

  return (
    <div className="flex flex-col gap-6 mb-12 ml-32 w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-[#232360]">Theme</h2>
      <div className="w-full h-[1px] bg-[#E0CFBE]" />

      {(["work", "shortBreak", "longBreak"] as ColorField[]).map((field) => (
        <div key={field} className="flex items-center justify-between gap-8">
          <label className="text-sm font-medium text-black w-48">
            {field === "work"
              ? "Work color"
              : field === "shortBreak"
              ? "Short break color"
              : "Long break color"}
          </label>
          <div className="relative w-[40px] h-[24px]">
            <div
              className="w-full h-full rounded-md cursor-pointer"
              style={{ backgroundColor: themeColors[field] }}
              onClick={() => setActiveField(field)}
            />
            {activeField === field && (
              <ColorPickerModal
                currentColor={themeColors[field]}
                onSelectColor={(color) => handleColorSelect(field, color)}
                onClose={() => setActiveField(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSettings;
