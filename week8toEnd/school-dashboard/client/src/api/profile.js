import { api } from "./axios";

export const profile = async () => {
    const { data } = await api.get("user/profile");
    return data;
};