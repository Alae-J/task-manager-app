import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TasksManagement from '../features/tasks/pages/TasksManagement'
import EditTaskPage from '../features/tasks/pages/EditTaskPage'
import AddTaskPage from '../features/tasks/pages/AddTaskPage'
import SettingsPage from '../features/settings/pages/SettingsPage'
import PomodoroPage from '../features/pomodoro/pages/Pomodoro'
import RequireAuth from '../components/auth/RequireAuth'
import LoginPage from '../features/auth/pages/LoginPage'
import Layout from '../components/Layout'
import RegisterPage from '../features/auth/pages/RegisterPage'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout>
                                <TasksManagement />
                            </Layout>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/pomodoro/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <PomodoroPage />
                            </Layout>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/tasks/edit/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <EditTaskPage />
                            </Layout>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/tasks/add"
                    element={
                        <RequireAuth>
                            <Layout>
                                <AddTaskPage />
                            </Layout>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <RequireAuth>
                            <Layout>
                                <SettingsPage />
                            </Layout>
                        </RequireAuth>
                    }
                />
            </Routes>
        </Router>
    )

            {/* {loading && <p>Loading...</p>}
            {
                messages && 
                <div>
                { 
                    messages.map((message: Message) => (
                        <SuccessAlert message={message.message} />
                    ))
                }
                </div>
            }
            {
                onDashboard && 
                <div className="w-full max-w-2xl mt-6 space-y-4">
                {tasks.map((task) => <TaskCard key={task.id} {...task} handleDeleteTask={handleDeleteTask} setSelectedId={setSelectedId} onDashboard={onDashboard} setOnDashboard={setOnDashboard} onAddTask={onAddTask} setOnAddTask={setOnAddTask} setIsEditing={setIsEditing} />)}
                </div>
            }
            {
                onAddTask &&
                <TaskForm selectedId={selectedId} selectedTask={tasks.filter((task) => task.id == selectedId)[0]} handleEditTask={handleEditTask} isEditing={isEditing} setIsEditing={setIsEditing} handleAddTask={handleAddTask} errors={errors} setErrors={setErrors} fetchTaskById={fetchTaskById} />
            } */}
}

export default AppRoutes