
interface Props {
    id: number,
    title: string,
    description: string,
    hasPriority: boolean,
    handleDeleteTask: (id: number) => void
    setSelectedId: (id: number) => void
    onDashboard: boolean,
    setOnDashboard: (onDashBoard: boolean) => void,
    onAddTask: boolean,
    setOnAddTask: (onDashBoard: boolean) => void,
    setIsEditing: (isEditing: boolean) => void
} // onDashboard={onDashboard}, setOnDashboard={setOnDashboard}, onAddTask={onAddTask}, setOnAddTask={setOnAddTask}

const TaskCard = (props: Props) => {
    const { id, title, description, hasPriority, handleDeleteTask, setSelectedId, onDashboard, setOnDashboard, onAddTask, setOnAddTask, setIsEditing } = props;
    return (
        <div className={!hasPriority ? "bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition" : "bg-white shadow-md rounded-lg p-5 border border-red-400 hover:shadow-lg transition"}>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4 flex justify-between">
                <button className="cursor-pointer text-sm text-blue-500 hover:text-blue-600" onClick={() => {
                    setSelectedId(id);
                    setIsEditing(true);
                    setOnDashboard(false);
                    setOnAddTask(true);
                }}>Edit</button>
                <button className="cursor-pointer text-sm text-red-500 hover:text-red-600" onClick={() => handleDeleteTask(id)}>Delete</button>
            </div>
        </div>
    )
}

export default TaskCard;
