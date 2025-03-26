import React from 'react'

interface Props {
    onDashboard: boolean,
    onAddTask: boolean,
    handleRouting: (onDashboard: boolean, onAddTask: boolean) => void,
    setIsEditing: (isEditing: boolean) => void
}

const NavBar = ({ handleRouting, setIsEditing }: Props) => {
    return (
        <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <button onClick={() => {
                handleRouting(true, false);
                setIsEditing(false);
            }} className="cursor-pointer text-xl font-bold text-gray-800">Task Manager</button>
            <button onClick={() => {
                handleRouting(false, true);
                setIsEditing(false);
            }} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Add Task
            </button>
        </nav>
    )
}

export default NavBar;
