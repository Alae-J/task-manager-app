import { useState } from "react";

interface Props {
    selectedId: number,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    handleAddTask: (title: string, description: string, hasPriority: boolean) => void,
    handleEditTask: (id: number, title: string, description: string, hasPriority: boolean) => void
}

const TaskForm = ({ selectedId, isEditing, setIsEditing, handleAddTask, handleEditTask }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hasPriority, setHasPriority] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!title.trim() || !description.trim()) return;
        if (isEditing) {
            handleEditTask(selectedId, title, description, hasPriority)
            setIsEditing(false);
        } else handleAddTask(title, description, hasPriority);
        setTitle("");
        setDescription("");
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create a New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input onChange={(e) => {
                        setHasPriority(e.target.checked)
                    }} id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prioritize?</label>
                </div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
