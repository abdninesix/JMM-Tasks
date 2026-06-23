import { api } from "./axios";

export const dashboardStudent = async () => {
    const { data } = await api.get("student/dashboard");
    return data;
};