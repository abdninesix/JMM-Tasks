import { api } from "./axios";

export const registerUser = async (payload) => {
    const { data } = await api.post("/register", payload);
    return data;
};