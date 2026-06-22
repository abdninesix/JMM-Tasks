import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";

const ProtectedRoute = ({ children, allowedRole }) => {

    const { user, checkingAuth } = useAuth();

    const location = useLocation();

    if (checkingAuth) {
        return <CgSpinner className="mx-auto mt-10 animate-spin" />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRole && !allowedRole.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;