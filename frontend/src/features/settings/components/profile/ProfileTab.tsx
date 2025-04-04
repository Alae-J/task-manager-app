import { User } from "../../../../types/user";
import EditableField from "./EditableField";
import PasswordField from "./PasswordField";

interface Props {
    user: User,
    editing: { username: boolean; email: boolean; passwordHash: boolean },
    onChange: (field: string, value: string) => void,
    onStartEdit: (field: "username" | "email" | "passwordHash") => void,
}

const ProfileTab = ({ user, editing, onChange, onStartEdit }: Props) => {
    return (
        <div className="px-8 pt-2">
            <div className="ml-32 flex flex-col gap-8 mt-16 w-full max-w-xl">
                <EditableField
                    label="Username"
                    value={user.username}
                    editing={editing.username}
                    onChange={(val) => onChange("username", val)}
                    onStartEdit={() => onStartEdit("username")}
                    icon="edit"
                />
                <EditableField
                    label="Email"
                    value={user.email}
                    editing={editing.email}
                    onChange={(val) => onChange("email", val)}
                    onStartEdit={() => onStartEdit("email")}
                    icon="edit"
                    iconType="email"
                />
                <PasswordField
                    password={user.passwordHash}
                    editing={editing.passwordHash}
                    onChange={(val) => onChange("passwordHash", val)}
                    onStartEdit={() => onStartEdit("passwordHash")}
                />
            </div>
        </div>
    )
};


export default ProfileTab;
