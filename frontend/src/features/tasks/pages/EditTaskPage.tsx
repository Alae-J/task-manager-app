import { useEffect, useState } from 'react';
import { CreateTaskPayload } from '../../../types/task';
import { useNavigate, useParams } from 'react-router-dom';
import { handleEditTask } from '../../../services/taskService';
import { useTask } from '../../../hooks/useTasks';

const EditTaskPage = () => {
    const { id } = useParams();
    const parsedId = id && !isNaN(Number(id)) ? parseInt(id) : null;
    const task = useTask(parsedId);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [estimatedTime, setEstimatedTime] = useState<number>(0);
    const [hasPriority, setHasPriority] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (task != undefined) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(new Date(task.dueDate)); 
            setEstimatedTime(task.estimatedTime);
            setHasPriority(task.hasPriority);
        }
    }, [id, task])

    const validateForm = () => {
        if (!title.trim()) return "Title is required.";
        if (!description.trim()) return "Description is required.";
        if (!dueDate) return "Please select a due date.";
        if (estimatedTime <= 0) return "Estimated time must be greater than 0.";
        return null;
    };

    const handleSave = async () => {
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }
    
        const task: CreateTaskPayload = {
            title,
            description,
            hasPriority,
            dueDate: dueDate?.toISOString().split("T")[0] ?? "", // ISO format
            estimatedTime,
            timeSpent: 0,
            completed: false,
            status: "PENDING",
            updatedAt: new Date().toISOString()
        };

    
        try {
            if (!id) return
            await handleEditTask(parseInt(id), task);
            navigate('/tasks');
            alert("Task edited successfully!");
        } catch (err) {
            console.error("Failed to save task:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen w-full px-4 py-12 flex justify-center items-start overflow-x-hidden overflow-y-auto">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10 sm:p-14">
                <h1 className="text-4xl font-bold text-center text-black mb-10">Edit Task</h1>

                <form className="space-y-8">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-lg font-semibold text-[#37383B] mb-2 pl-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9CA88] px-4 py-3 transition"
                        />
                    </div>

                    
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-[#37383B] mb-2 pl-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9CA88] px-4 py-3 resize-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        <div>
                        <label htmlFor="dueDate" className="block text-lg font-semibold text-[#37383B] mb-2 pl-1">
                            Due date
                        </label>
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => {
                                setDueDate(e.target.value ? new Date(e.target.value) : null);
                            }}
                            className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9CA88] px-4 py-3 transition"
                        />
                        </div>

                        
                        <div>
                        <label htmlFor="estimatedTime" className="block text-lg font-semibold text-[#37383B] mb-2 pl-1">
                            Estimated time (hours)
                        </label>
                        <input
                            id="estimatedTime"
                            type="number"
                            min={0}
                            value={estimatedTime}
                            onChange={(e) => {
                                setEstimatedTime(parseFloat(e.target.value));
                            }}
                            className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9CA88] px-4 py-3 transition"
                        />
                        </div>
                    </div>

                    
                    <div className="flex items-center space-x-3 pt-2">
                        <input
                            id="hasPriority"
                            type="checkbox"
                            checked={hasPriority}
                            onChange={(e) => {
                                setHasPriority(e.target.checked);
                            }}
                            className="w-5 h-5 text-[#E9CA88] focus:ring-[#E9CA88] border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="hasPriority" className="text-md font-medium text-[#37383B] cursor-pointer">
                            Mark as High Priority
                        </label>
                    </div>


                    
                    <div className="flex justify-center pt-6">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="cursor-pointer bg-[#E9CA88] hover:brightness-105 hover:scale-105 transition-transform duration-200 px-10 py-3 rounded-full text-white font-semibold text-xl shadow-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskPage