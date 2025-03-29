import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getAllTasks } from "../services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const load = async () => {
            const data = await getAllTasks();
            if (data) setTasks(data);
            setLoading(false);
        };
        load();
    }, []);
    
    return { loading, tasks };
};