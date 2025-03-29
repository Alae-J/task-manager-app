// Represents the backend response or existing task
export interface Task {
    id: number;
    title: string;
    description: string;
    hasPriority: boolean;
    dueDate: string;
    estimatedTime: number;
    timeSpent: number;
    completed: boolean;
    status: string;
    updatedAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description: string;
    hasPriority: boolean;
    dueDate: string;
    estimatedTime: number;
    timeSpent: number;
    completed: boolean;
    status: string;
    updatedAt: string;
}
