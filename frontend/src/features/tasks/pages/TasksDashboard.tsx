import FloatingAddButton from '../../../components/FloatingAddButton';
import TaskCard from '../../../components/TaskCard';
import { useTasks } from '../../../hooks/useTasks';

const TasksDashboard = () => {
    const { tasks, loading } = useTasks();
    
    if (loading) {
        return (
            <div className="text-center text-gray-600 mt-10 text-lg">Loading...</div>
        );
    }
    
    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))}
                <FloatingAddButton />
            </div>
        </div>
    );
};

export default TasksDashboard;
