import { api } from "./axios";

export const fetchAllUsers = async (page = 1) => {
    const { data } = await api.get(`admin/users?page=${page}`);
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