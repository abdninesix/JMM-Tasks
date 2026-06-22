import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { profile } from "../api/profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("access_token") || null);

    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["auth-user"],
        queryFn: profile,
        enabled: !!token,
    });

    useEffect(() => {
        if (error?.response?.status === 401) {
            logout();
        }
    }, [error]);

    const user = data?.user;

    const login = (userData, userToken) => {
        setToken(userToken);
        localStorage.setItem("access_token", userToken);
        queryClient.setQueryData(["auth-user"], { user: userData });
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("access_token");
        queryClient.removeQueries(["auth-user"]);
    };

    const checkingAuth = !!token && (isLoading && !data);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, checkingAuth, isAuthenticated: !!user && !!token, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);