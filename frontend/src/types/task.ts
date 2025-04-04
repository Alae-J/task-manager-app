export interface Task {
    id: number,
    title: string,
    description: string,
    hasPriority: boolean,
    dueDate: string,
    estimatedTime: number,
    completed: boolean,
    status: string,
    updatedAt: string,
    sessionsCount: number
};

export interface CreateTaskPayload {
    title: string,
    description: string,
    hasPriority: boolean,
    dueDate: string,
    estimatedTime: number,
    completed: boolean,
    status: string,
    sessionsCount: number
};
