import { api } from "./axios";

export const profile = async () => {
    const { data } = await api.get("user/profile");
    return data;
};

export const editProfile = async (payload) => {
    const { data } = await api.put("user/profile", payload);
    return data;
};

export const uploadPicture = async (formData) => {
    const { data } = await api.post("user/upload-picture", formData, {
        headers: { "Content-Type": "multipart/form-data", },
    });
    return data;
};

export const changePassword = async (payload) => {
    const { data } = await api.post("user/change-password", payload);
    return data;
};