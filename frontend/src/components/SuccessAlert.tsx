import React from 'react'

interface Props {
    message: string
}

const SuccessAlert = ({ message }: Props) => {
    return (
        <div className="p-4 m-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success alert!</span> {message}
        </div>
    )
}

export default SuccessAlert