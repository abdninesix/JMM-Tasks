import { Navigate, useLocation } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {

    const { user, checkingAuth } = useAuth();

    const location = useLocation();

    if (checkingAuth) {
        return <CgSpinner size={40} className="mx-auto mt-20 animate-spin" />;
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