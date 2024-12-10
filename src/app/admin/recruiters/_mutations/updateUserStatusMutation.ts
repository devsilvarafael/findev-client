import { MutationFunction } from "@tanstack/react-query";
import api from "@/services/api";

export const updateUserStatus: MutationFunction<unknown, { userId: string; isActive: boolean }> = async ({ userId, isActive }) => {
    const response = await api.put(`/auth/${userId}?status=${isActive}`);
    return response.data;
};
