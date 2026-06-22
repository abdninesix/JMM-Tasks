import { Navigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = ({ children }) => {

    const { user, checkingAuth } = useAuth();

    if (checkingAuth) {
        return <CgSpinner size={40} className="mx-auto mt-20 animate-spin" />;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;