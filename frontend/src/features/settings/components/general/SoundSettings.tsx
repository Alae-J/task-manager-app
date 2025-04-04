
interface Props {
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  onStartEdit: () => void;
}

const soundOptions = ["None", "Forest", "Rain", "Waves", "Café"];

const SoundSettings = ({ value, editing, onChange, onStartEdit }: Props) => {
    return (
        <div className="flex flex-col gap-6 mb-12 ml-32 w-full max-w-2xl">
            {/* Title */}
            <h2 className="text-lg font-semibold text-[#232360]">Sound</h2>
            <div className="w-full h-[1px] bg-[#E0CFBE]" />

            <div className="flex items-center justify-between gap-8">
                <label className="text-sm font-medium text-black w-48">Work sound</label>

                {!editing ? (
                    <div className="relative w-[112px] h-[30px]">
                        <button
                            className="w-full h-full bg-[#D8AA80] text-white text-sm font-medium rounded-md pl-3 pr-6 cursor-pointer appearance-none text-left"
                            onClick={onStartEdit}
                        >
                            {value}
                        </button>
                        <div
                            className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    ) : (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-[112px] h-[30px] bg-[#D8AA80] text-white text-sm font-medium rounded-md pl-3 pr-6 appearance-none focus:outline-none cursor-pointer relative"
                        style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1rem",
                        }}
                    >
                    
                        {soundOptions.map((opt) => (
                        <option key={opt} value={opt} className="text-black">
                            {opt}
                        </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default SoundSettings;
