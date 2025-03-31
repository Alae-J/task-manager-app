import { FaFilter, FaList, FaSortAmountDown, FaThLarge } from "react-icons/fa";
import TaskListRow from "../components/TaskListRow";
import { useTasks } from "../../../hooks/useTasks";
import FloatingAddButton from "../../../components/FloatingAddButton";
import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import TaskCard from "../../../components/TaskCard";

const TasksManagement = () => {
    const { tasks: initialTasks, loading } = useTasks();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [board, setBoard] = useState<boolean>(true);

    const removeTaskFromList = (id: number) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        if (!loading) {
            setTasks(initialTasks);
        }
    }, [loading, initialTasks]);

    if (loading) {
        return (
            <div className="text-center text-gray-600 mt-10 text-lg">Loading...</div>
        );
    }
    return (
        <div className="min-h-screen min-w-screen bg-[#F5F5F5] px-28 py-6">
            
            <div className="flex justify-between items-center mb-6">
                
                <div className="flex gap-3">
                    <button
                        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-black font-semibold transition hover:scale-105 hover:shadow-md ${
                        board ? "shadow-md bg-[#FFFDF6]" : "bg-[#FFFDF6]"
                        }`}
                        onClick={() => setBoard(true)}
                    >
                        <FaThLarge />
                        Board
                    </button>

                    <button
                        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-black font-semibold transition hover:scale-105 hover:shadow-md ${
                        !board ? "shadow-md bg-[#FFFDF6]" : "bg-[#FFFDF6]"
                        }`}
                        onClick={() => setBoard(false)}
                    >
                        <FaList />
                        List
                    </button>
                </div>


                
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-black">Manage Tasks</h1>

                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#FFFDF6] shadow-md rounded-full text-black font-semibold hover:scale-105 transition">
                        <FaFilter />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#FFFDF6] shadow-md rounded-full text-black font-semibold hover:scale-105 transition">
                        <FaSortAmountDown />
                        Sort
                    </button>
                </div>
            </div>

            
            {!board ?
                <div className="bg-[#FFFDF6] rounded-2xl shadow-xl w-full max-h-[40rem] overflow-y-auto custom-scrollbar p-2">
                    {tasks.map((task) => (
                        <TaskListRow key={task.id} task={task} handleDelete={removeTaskFromList} />
                    ))}
                </div>
                :
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {tasks.map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))}
                    </div>
            }
            <FloatingAddButton />
        </div>
    );
};

export default TasksManagement;
