import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleGuard = ({ allowedRole, children }) => {

    const { user } = useAuth();

    if (allowedRole && !allowedRole.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleGuard;