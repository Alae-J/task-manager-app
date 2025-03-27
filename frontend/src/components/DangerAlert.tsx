interface Props {
    status: string,
    error: string
}

const DangerAlert = ({ status, error }: Props) => {
    return (
        <div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error {status}!</span> {error}
        </div>
    )
}

export default DangerAlert