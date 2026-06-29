import { Navigate, Outlet } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = ({ children }) => {

    const { checkingAuth, isAuthenticated } = useAuth();

    if (checkingAuth) {
        return <CgSpinner size={40} className="mx-auto mt-20 animate-spin" />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;