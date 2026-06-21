import { api } from "./axios";

export const profile = async () => {
    const { data } = await api.get("user/profile");
    return data;
};

export const editProfile = async (payload) => {
    const { data } = await api.put("user/profile", payload);
    return data;
};