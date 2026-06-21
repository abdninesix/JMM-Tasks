import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { profile } from "../api/profile";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("access_token") || null);

    const { data, isLoading, error } = useQuery({
        queryKey: ["auth-user"],
        queryFn: profile,
        enabled: !!token,
    });

    const user = data?.user;

    const login = (userData, userToken) => {
        setToken(userToken);
        localStorage.setItem("access_token", userToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("access_token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAuthenticated: !!token && !!user, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);