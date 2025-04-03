import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getAllTasks, getTaskById } from "../services/taskService";

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

export const useTask = (id: number | null) => {
    const [task, setTask] = useState<Task | undefined>();

    useEffect(() => {
        const load = async () => {
            if (id !== null) {
                const data = await getTaskById(id);
                if (data) setTask(data);
            }
        };
        load();
    }, [id]);

    return task;
};
