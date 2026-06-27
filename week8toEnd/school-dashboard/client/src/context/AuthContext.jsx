import { createContext, useContext, useEffect, useState } from "react";
import { profile } from "../api/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api/auth";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("access_token") || null);

    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, isPending, error } = useQuery({
        queryKey: ["auth-user"],
        queryFn: profile,
        enabled: !!token,
    });

    useEffect(() => {
        if (error?.response?.status === 401) {
            logout();
        }
    }, [error?.response?.status]);

    const user = data?.user;

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setToken(data.access_token);
            localStorage.setItem("access_token", data.access_token);
            queryClient.setQueryData(["auth-user"], { user: data.user });
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            setToken(null);
            localStorage.removeItem("access_token");
            queryClient.removeQueries(["auth-user"]);
            toast.success(data.message);
        }
    });

    const checkingAuth = !!token && isLoading;
    const isAuthenticated = !!user && !!token

    return (
        <AuthContext.Provider value={{ user, token, loginMutation, logoutMutation, checkingAuth, isAuthenticated, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);