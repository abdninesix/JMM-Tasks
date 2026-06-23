import { api } from "./axios";

export const dashboardTeacher = async () => {
    const { data } = await api.get("teacher/dashboard");
    return data;
};