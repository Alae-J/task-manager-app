import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TaskCard from './components/TaskCard';
import axios, { HttpStatusCode } from 'axios';
import TaskForm from './components/TaskForm';

interface Task {
  id: number,
  title: string,
  description: string,
  hasPriority: boolean
}

interface Error {
  id: number,
  message: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [onDashboard, setOnDashboard] = useState<boolean>(true);
  const [onAddTask, setOnAddTask] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  // for getting the most uptodate tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // for handling routing
  useEffect(() => {
    handleRouting(onDashboard, onAddTask);
  }, [onDashboard, onAddTask]);

  // fetching all the tasks stored in the db
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get<Task[]>("http://localhost:8080/task/all");
      setTasks(response);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", (err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  // handling deleting from the db
  const handleDeleteTask = async (id: number) => {
    setLoading(true);
    try {
      const { data: response } = await axios.delete<HttpStatusCode>(`http://localhost:8080/task/${id}`);
      fetchTasks();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", (err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }

  // adding a task
  const handleAddTask = async (title: string, description: string, hasPriority: boolean) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post<Task>("http://localhost:8080/task", {
        title,
        description,
        hasPriority
      });
      fetchTasks();
      setOnDashboard(true);
      setOnAddTask(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data.detail || err.message;
        const prevErrors = errors;
        const id = Date.now();
        setErrors([...prevErrors, { id, message: detail }]);
        setTimeout(() => {
          const newErrors = (prevErrors: Error[]) => prevErrors.filter((error) => error.id != id);
          setErrors(newErrors);
        }, 5000);
      } else {
        console.error("Unexpected error:", (err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleEditTask = async (id: number, title: string, description: string, hasPriority: boolean) => {
    setLoading(true);
    setSelectedId(id);
    try {
      const { data: response } = await axios.put<Task>(`http://localhost:8080/task/${id}`, {
        title,
        description,
        hasPriority
      });
      fetchTasks();
      setOnDashboard(true);
      setOnAddTask(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data.detail || err.message;
        const prevErrors = errors;
        const id = Date.now();
        setErrors([...prevErrors, { id, message: detail }]);
        setTimeout(() => {
          const newErrors = (prevErrors: Error[]) => prevErrors.filter((error) => error.id != id);
          setErrors(newErrors);
        }, 5000);
      } else {
        console.error("Unexpected error:", (err as Error).message);
      }
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

  // to simulate react router
  const handleRouting = (dashboard: boolean, addTask: boolean) => {
    setOnDashboard(dashboard);
    setOnAddTask(addTask);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <NavBar onDashboard={onDashboard} onAddTask={onAddTask} handleRouting={handleRouting} setIsEditing={setIsEditing} />
      {loading && <p>Loading...</p>}
      {
        onDashboard && 
        <div className="w-full max-w-2xl mt-6 space-y-4">
          {tasks.map((task) => <TaskCard key={task.id} {...task} handleDeleteTask={handleDeleteTask} setSelectedId={setSelectedId} onDashboard={onDashboard} setOnDashboard={setOnDashboard} onAddTask={onAddTask} setOnAddTask={setOnAddTask} setIsEditing={setIsEditing} />)}
        </div>
      }
      {
        onAddTask &&
        <TaskForm selectedId={selectedId} handleEditTask={handleEditTask} isEditing={isEditing} setIsEditing={setIsEditing} handleAddTask={handleAddTask} errors={errors} setErrors={setErrors} />
      }
    </div>
  )
}

export default App;
