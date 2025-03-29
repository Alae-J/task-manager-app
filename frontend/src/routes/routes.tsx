import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TasksManagement from '../features/tasks/pages/TasksManagement'
import NavBar from '../components/NavBar'
import EditTaskPage from '../features/tasks/pages/EditTaskPage'
import TasksDashboard from '../features/tasks/pages/TasksDashboard'
import AddTaskPage from '../features/tasks/pages/AddTaskPage'
import SettingsPage from '../features/settings/pages/SettingsPage'

const AppRoutes = () => {
    return (
        <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <NavBar />
        <div>
            <Routes>
            <Route path='/' element={<TasksDashboard />} />
            <Route path='/tasks' element={<TasksManagement />} />
            <Route path='/tasks/edit' element={<EditTaskPage />} />
            <Route path='/tasks/add' element={<AddTaskPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            </Routes>
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
        </div>
        </div>
        </Router>
    )
}

export default AppRoutes