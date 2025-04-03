import './App.css'
import AppRoutes from './routes/routes';


function App() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [errors, setErrors] = useState<error[]>([]);
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [onDashboard, setOnDashboard] = useState<boolean>(true);
  // const [onAddTask, setOnAddTask] = useState<boolean>(false);
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [selectedId, setSelectedId] = useState<number>(0);

  // // for getting the most uptodate tasks
  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // // for handling routing
  // useEffect(() => {
  //   handleRouting(onDashboard, onAddTask);
  // }, [onDashboard, onAddTask]);

  // // fetching all the tasks stored in the db
  // const fetchTasks = async () => {
  //   setLoading(true);
  //   try {
  //     const { data: response } = await axios.get<Task[]>("http://localhost:8080/task/all");
  //     setTasks(response);
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       console.error("Axios error:", err.response?.data || err.message);
  //     } else {
  //       console.error("Unexpected error:", (err as Error).message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // fetching all the tasks stored in the db
  // const fetchTaskById = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     const { data: response } = await axios.get<Task>(`localhost:8080/task/${id}`);
  //     return response;
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       const messages = err.response?.data.messages || err.message;
  //       const status = err.response?.data.status || err.message;
  //       const prevErrors = errors;
  //       const id = Date.now();
  //       setErrors([...prevErrors, { id, messages, status }]);
  //       setTimeout(() => {
  //         const newErrors = (prevErrors: error[]) => prevErrors.filter((error) => error.id != id);
  //         setErrors(newErrors);
  //       }, 5000);
  //     } else {
  //       console.error("Unexpected error:", (err as Error).message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // // handling deleting from the db
  // const handleDeleteTask = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     const { data: response } = await axios.delete<HttpStatusCode>(`http://localhost:8080/task/${id}`);
  //     fetchTasks();
  //     const prevMessages = messages;
  //     const id2 = Date.now();
  //     setMessages([...prevMessages, { id: id2, message: "Successfully Deleted the task!" }]);
  //     setTimeout(() => {
  //       const newMessages = (messages: Message[]) => messages.filter((message) => message.id != id2);
  //       setMessages(newMessages);
  //     }, 5000);
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       console.error("Axios error:", err.response?.data || err.message);
  //     } else {
  //       console.error("Unexpected error:", (err as Error).message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // // adding a task
  // const handleAddTask = async (title: string, description: string, hasPriority: boolean) => {
  //   setLoading(true);
  //   try {
  //     const { data: response } = await axios.post<Task>("http://localhost:8080/task", {
  //       title,
  //       description,
  //       hasPriority
  //     });
  //     fetchTasks();
  //     setOnDashboard(true);
  //     setOnAddTask(false);
  //     const prevMessages = messages;
  //     const id2 = Date.now();
  //     setMessages([...prevMessages, { id: id2, message: "Successfully added the task!" }]);
  //     setTimeout(() => {
  //       const newMessages = (messages: Message[]) => messages.filter((message) => message.id != id2);
  //       setMessages(newMessages);
  //     }, 5000);
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       const messages = err.response?.data.messages || err.message;
  //       const status = err.response?.data.status || err.message;
  //       const prevErrors = errors;
  //       const id = Date.now();
  //       setErrors([...prevErrors, { id, messages, status }]);
  //       setTimeout(() => {
  //         const newErrors = (prevErrors: error[]) => prevErrors.filter((error) => error.id != id);
  //         setErrors(newErrors);
  //       }, 5000);
  //     } else {
  //       console.error("Unexpected error:", (err as Error).message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const handleEditTask = async (id: number, title: string, description: string, hasPriority: boolean) => {
  //   setLoading(true);
  //   setSelectedId(id);
  //   try {
  //     const { data: response } = await axios.put<Task>(`http://localhost:8080/task/${id}`, {
  //       title,
  //       description,
  //       hasPriority
  //     });
  //     fetchTasks();
  //     setOnDashboard(true);
  //     setOnAddTask(false);
  //     const prevMessages = messages;
  //     const id2 = Date.now();
  //     setMessages([...prevMessages, { id: id2, message: "Successfully edited the task!" }]);
  //     setTimeout(() => {
  //       const newMessages = (messages: Message[]) => messages.filter((message) => message.id != id2);
  //       setMessages(newMessages);
  //     }, 5000);
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       const messages = err.response?.data.detail || err.message;
  //       const status = err.response?.data.status || err.message;
  //       const prevErrors = errors;
  //       const id = Date.now();
  //       setErrors([...prevErrors, { id, messages, status }]);
  //       setTimeout(() => {
  //         const newErrors = (prevErrors: error[]) => prevErrors.filter((error) => error.id != id);
  //         setErrors(newErrors);
  //       }, 5000);
  //     } else {
  //       console.error("Unexpected error:", (err as Error).message);
  //     }
  //   } finally {
  //     setLoading(false);
  //     setIsEditing(false);
  //   }
  // }

  // // to simulate react router
  // const handleRouting = (dashboard: boolean, addTask: boolean) => {
  //   setOnDashboard(dashboard);
  //   setOnAddTask(addTask);
  // }

  return (
    <AppRoutes />
  )
}

export default App;
