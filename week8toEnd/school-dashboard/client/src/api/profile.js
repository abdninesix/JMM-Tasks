import { api } from "./axios";

export const profile = async () => {
    const { data } = await api.get("user/profile");
    return data;
};

export const editProfile = async (payload) => {
    const { data } = await api.put("user/profile", payload);
    return data;
};

export const uploadPicture = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.post("user/upload-picture", formData, {
        headers: { "Content-Type": "multipart/form-data", },
    });
    return data;
};