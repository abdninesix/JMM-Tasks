import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";

const GuestRoute = ({ children }) => {
    
    const { user, isPending } = useAuth();

    if (isPending) {
        return <CgSpinner className="mx-auto mt-10 animate-spin" />;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;