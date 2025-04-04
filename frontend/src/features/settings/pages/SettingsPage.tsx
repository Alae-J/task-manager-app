import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import GeneralTab from "../components/general/GeneralTab";
import ProfileTab from "../components/profile/ProfileTab";
import { UserSettings } from "../../../types/userSettings";
import { User } from "../../../types/user";
import { getUserById, handleChangeCredentials } from "../../../services/userService";
import { getUserSettings, updateUserSettings } from "../../../services/settingsService";

type EditingSettingsState = {
    workDuration: boolean;
    shortBreakDuration: boolean;
    longBreakDuration: boolean;
    workColor: boolean;
    shortBreakColor: boolean;
    longBreakColor: boolean;
    backgroundSound: boolean;
};


const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<"general" | "profile">("general");
    const [actualUserId, setActualUserId] = useState<number>(0);

    // Profile states
    const [originalData, setOriginalData] = useState<User>({
        id: 0,
        username: "",
        email: "",
        passwordHash: "",
    });

    const [formData, setFormData] = useState<User>(originalData);
    const [editingFields, setEditingFields] = useState({
        username: false,
        email: false,
        passwordHash: false,
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const id = Number(userId);
        setActualUserId(id);

        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                const fetchedUser: User = {
                    id,
                    username: res?.username ?? "",
                    email: res?.email ?? "",
                    passwordHash: ""
                };
                setOriginalData(fetchedUser);
                setFormData(fetchedUser);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);

    const validateForm = () => {
        if (editingFields.username && formData.username.length > 20) {
            return "Username must not exceed 20 characters.";
        }

        if (editingFields.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                return "Invalid email format.";
            }
        }

        if (!editingFields.passwordHash) return "Password cannot be empty.";
        else {
            if (!formData.passwordHash || !formData.passwordHash.trim()) {
                return "Password cannot be empty.";
            }

            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(formData.passwordHash)) {
                return "Password must be at least 8 characters, with letters, numbers, and symbols.";
            }
        }

        return "";
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleStartEdit = (field: keyof typeof editingFields) => {
        setEditingFields(prev => ({ ...prev, [field]: true }));
    };

    // General settings states
    const [originalSettings, setOriginalSettings] = useState<UserSettings>({
        id: 0,
        workDuration: 50,
        shortBreakDuration: 10,
        longBreakDuration: 30,
        workColor: "#DB5C3C",
        shortBreakColor: "#3CDB84",
        longBreakColor: "#3CDB84"
    });

    const [formSettings, setFormSettings] = useState<UserSettings>(originalSettings);
    const [editingFieldsGeneral, setEditingFieldsGeneral] = useState<EditingSettingsState>({
        workDuration: false,
        shortBreakDuration: false,
        longBreakDuration: false,
        workColor: false,
        shortBreakColor: false,
        longBreakColor: false,
        backgroundSound: false,
    });


    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const fetchSettings = async () => {
            try {
                const data = await getUserSettings(Number(userId));
                if (data) {
                    setOriginalSettings(data);
                    setFormSettings(data);
                };
            } catch (err) {
                console.error("Failed to fetch user settings", err);
            }
        };

        fetchSettings();
    }, []);

    const handleChangeGeneral = (
        field: keyof UserSettings,
        value: number | string
    ) => {
        setFormSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleStartEditGeneral = (field: keyof typeof editingFieldsGeneral) => {
        setEditingFieldsGeneral(prev => ({ ...prev, [field]: true }));
    };

    const handleCancel = () => {
        if (activeTab === "general") {
            setFormSettings(originalSettings);
            setEditingFieldsGeneral({
                workDuration: false,
                shortBreakDuration: false,
                longBreakDuration: false,
                workColor: false,
                shortBreakColor: false,
                longBreakColor: false,
                backgroundSound: false,
            });
        } else {
            setFormData(originalData);
            setEditingFields({
                username: false,
                email: false,
                passwordHash: false
            });
        }
    };

    const handleSave = async () => {
        if (activeTab === "general") {
            try {
                const response = await updateUserSettings(actualUserId, formSettings);
                if (response) setOriginalSettings(response);
                setEditingFieldsGeneral({
                    workDuration: false,
                    shortBreakDuration: false,
                    longBreakDuration: false,
                    workColor: false,
                    shortBreakColor: false,
                    longBreakColor: false,
                    backgroundSound: false,
                });
            } catch (err) {
                console.error("Failed to save settings:", err);
            }
        } else {
            try {
                const error = validateForm();
                if (error) return alert(error);

                const response = await handleChangeCredentials(actualUserId, formData);
                if (response) setOriginalData({...response, passwordHash: ""});
                setEditingFields({
                    username: false,
                    email: false,
                    passwordHash: false
                });
            } catch (err) {
                console.error("Failed to save profile:", err);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F3F4F8] text-black">
            <Banner
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSave={handleSave}
                onCancel={handleCancel}
            />
            <div className="w-full pt-[100px]">
                {activeTab === "general" ? (
                    <GeneralTab
                        settings={formSettings}
                        editing={editingFieldsGeneral}
                        onChange={handleChangeGeneral}
                        onStartEdit={handleStartEditGeneral}
                    />
                ) : (
                    <ProfileTab
                        user={formData}
                        editing={editingFields}
                        onChange={handleChange}
                        onStartEdit={handleStartEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
