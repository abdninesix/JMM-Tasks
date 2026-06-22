import { api } from "./axios";

export const fetchAllUsers = async () => {
    const { data } = await api.get("admin/users");
    return data;
};

export const assignRole = async ({ id, role }) => {
    const { data } = await api.post(`admin/users/${id}/assign-role`, { role });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`admin/users/${id}`);
    return data;
};