import axios from "axios";
import { CreateTaskPayload, Task } from "../types/task";

export const getAllTasks = async () => {
    try {
        const { data: response } = await axios.get<Task[]>("http://localhost:8080/task/all");
        return response;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Axios error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
        return null;
    }
};

export const getTask = async (id: number) => {
    try {
        const { data: response } = await axios.get<Task>(`http://localhost:8080/task/${id}`);
        return response;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Axios error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
        return null;
    }
};

export const handleAddTask = async (task: CreateTaskPayload) => {
    try {
        const { data } = await axios.post<Task>(`http://localhost:8080/task/user/3`, task);
        return data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const messages = err.response?.data.detail || err.message;
            const status = err.response?.data.status || err.message;
            console.log(messages, status);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
    }
}

export const handleEditTask = async (id: number, task: CreateTaskPayload) => {
    try {
        const { data } = await axios.put<Task>(`http://localhost:8080/task/${id}`, task);
        return data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const messages = err.response?.data.detail || err.message;
            const status = err.response?.data.status || err.message;
            console.log(messages, status);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
    }
}

export const handleDeleteTask = async (id: number) => {
    try {
        const { data } = await axios.delete<Task>(`http://localhost:8080/task/${id}`);
        return data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const messages = err.response?.data.detail || err.message;
            const status = err.response?.data.status || err.message;
            console.log(messages, status);
        } else {
            console.error("Unexpected error:", (err as Error).message);
        }
    }
}

//   const handleEditTask = async (id: number, title: string, description: string, hasPriority: boolean) => {
//     setLoading(true);
//     setSelectedId(id);
//     try {
//       const { data: response } = await axios.put<Task>(`http://localhost:8080/task/${id}`, {
//         title,
//         description,
//         hasPriority
//       });
//       fetchTasks();
//       setOnDashboard(true);
//       setOnAddTask(false);
//       const prevMessages = messages;
//       const id2 = Date.now();
//       setMessages([...prevMessages, { id: id2, message: "Successfully edited the task!" }]);
//       setTimeout(() => {
//         const newMessages = (messages: Message[]) => messages.filter((message) => message.id != id2);
//         setMessages(newMessages);
//       }, 5000);
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         const messages = err.response?.data.detail || err.message;
//         const status = err.response?.data.status || err.message;
//         const prevErrors = errors;
//         const id = Date.now();
//         setErrors([...prevErrors, { id, messages, status }]);
//         setTimeout(() => {
//           const newErrors = (prevErrors: error[]) => prevErrors.filter((error) => error.id != id);
//           setErrors(newErrors);
//         }, 5000);
//       } else {
//         console.error("Unexpected error:", (err as Error).message);
//       }
//     } finally {
//       setLoading(false);
//       setIsEditing(false);
//     }
//   }