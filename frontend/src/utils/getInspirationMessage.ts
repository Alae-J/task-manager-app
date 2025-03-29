import dayjs from "dayjs"; // You can use date-fns too

export const getInspirationMessage = (task: Task): string => {
    const now = dayjs();
    const due = dayjs(task.dueDate);
    const daysRemaining = due.diff(now, "day");
    const isCompleted = task.completed;
    
    const { estimatedTime, timeSpent } = task;
    
    const overTime = timeSpent > estimatedTime;
    const aheadOfTime = timeSpent < estimatedTime;
    
    if (isCompleted) {
        if (daysRemaining > 0 && aheadOfTime) {
            return "You crushed it ahead of time!";
        } else if (daysRemaining < 0 && overTime) {
            return "Completed! Next time, let's aim tighter!";
        } else {
            return "Well done. Task completed!";
        }
    }
    
    if (daysRemaining <= 0 && !isCompleted) {
        if (timeSpent === 0) return "⏳ Time’s up! Let’s start strong next time.";
        return "⚠️ You're out of time — push to wrap it!";
    }
    
    if (daysRemaining <= 2 && estimatedTime - timeSpent > 1) {
        return "Final sprint! You can still make it.";
    }
    
    if (daysRemaining > 2 && aheadOfTime) {
        return "Cruising! You're ahead of schedule.";
    }
    
    if (overTime && daysRemaining > 1) {
        return "You're going deep — maybe simplify?";
    }
    
    return "Keep pushing — you're right on track!";
};
