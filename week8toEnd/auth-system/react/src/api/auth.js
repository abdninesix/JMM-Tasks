import { api } from "./axios";

export const registerUser = async (payload) => {
    const response = await api.post("/api/register", payload);
    return response.data;
};