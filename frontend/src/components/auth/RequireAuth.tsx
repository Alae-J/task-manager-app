import { JSX } from "react"
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element,
}
const RequireAuth = ({ children }: Props) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

export default RequireAuth;