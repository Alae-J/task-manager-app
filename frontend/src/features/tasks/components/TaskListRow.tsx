import { FaPen, FaTrash } from "react-icons/fa";
import { Task } from "../../../types/task"; // Adjust if needed
import { useOverflow } from "../../../hooks/useOverflow";
import { useNavigate } from "react-router-dom";
import { handleDeleteTask } from "../../../services/taskService";

type Props = {
    task: Task;
    handleDelete: (id: number) => void
};

const TaskListRow = ({ task, handleDelete }: Props) => {
    const { ref: titleRef, isOverflowing: titleOverflow } = useOverflow();
    const navigate = useNavigate();

    return (
        <div className="flex items-center border-b border-gray-200 px-6 py-4 bg-[#FFFDF6]">
            
            <div className="flex items-center gap-2 flex-[2] pr-4 border-r border-gray-300">
                <div className="text-sm font-semibold">{task.dueDate}</div>
                <div
                className={`w-3 h-3 rounded-full ${
                    task.hasPriority ? "bg-red-600" : "bg-yellow-400"
                }`}
                />
            </div>

            
            <div className="flex flex-col pl-6 pr-2 flex-[6] border-r border-gray-300">
                <div className="relative group h-[1.3rem]">
                    <div
                        ref={titleRef}
                        className="text-base font-bold text-[#1c1c1c] overflow-hidden line-clamp-1"
                    >
                        {task.title}
                    </div>
                    {titleOverflow && (
                            <div className="hidden group-hover:block absolute z-10 top-full mt-1 bg-white border border-gray-300 rounded-md shadow p-2 text-sm max-w-xs w-max">
                                {task.title}
                            </div>
                        )}
                </div>


            </div>

            
            <div className="flex items-center gap-2 pl-6 pr-2 flex-[1] border-r border-gray-300">
                <button className="cursor-pointer bg-yellow-300 hover:brightness-110 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold" onClick={() => { navigate(`/tasks/edit/${task.id}`) }}>
                    <FaPen size={12} />
                    Edit
                </button>
                <button className="cursor-pointer bg-red-600 hover:brightness-110 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold" onClick={async () => { 
                        handleDeleteTask(task.id);
                        handleDelete(task.id);
                    }}>
                    <FaTrash size={12} />
                    Delete
                </button>
            </div>
        </div>

    );
};

export default TaskListRow;
