import banner from "../../../assets/images/Banner.png";
import SaveCancelButtons from "./SaveCancelButtons";

interface Props {
    activeTab: "general" | "profile";
    onTabChange: (tab: "general" | "profile") => void;
    onSave: () => void;
    onCancel: () => void;
}

const Banner = ({ activeTab, onTabChange, onSave, onCancel }: Props) => (
    <div className="relative w-full">
        <img src={banner} className="w-full h-100 object-cover object-[center_-980px]" />
        <div className="absolute top-105 right-10 flex gap-4">
            <SaveCancelButtons onCancel={onCancel} onSave={onSave} />
        </div>
        <div className="absolute top-100 flex flex-col gap-2">
            {/* avatar + title + tabs */}
            {/* Avatar + Title + Tabs */}
            <div className="absolute left-32 flex flex-col gap-2">
                <h1 className="text-2xl font-bold mt-2">Settings</h1>

                {/* Tabs */}
                <div className="flex gap-8 mt-2 text-sm font-medium">
                    <button
                        className={`cursor-pointer pb-1 border-b-2 ${
                        activeTab === "general" ? "border-[#c97e4d]" : "border-transparent"
                        }`}
                        onClick={() => onTabChange("general")}
                    >
                        General
                    </button>
                    <button
                        className={`cursor-pointer pb-1 border-b-2 ${
                        activeTab === "profile" ? "border-[#c97e4d]" : "border-transparent"
                        }`}
                        onClick={() => onTabChange("profile")}
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default Banner;
