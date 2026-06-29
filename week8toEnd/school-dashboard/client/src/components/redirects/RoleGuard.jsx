import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleGuard = ({ allowedRole, children }) => {

    const { user } = useAuth();

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleGuard;