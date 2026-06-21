import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <CgSpinner className="mx-auto mt-10 animate-spin" />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;