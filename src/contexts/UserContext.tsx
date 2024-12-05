"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

const UserContext = createContext("");

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [simpleUserJson, setSimpleUserJson] = useState<{ id: string; role: string; email: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("@User");
        if (storedUser) {
            setSimpleUserJson(JSON.parse(storedUser));
        }
    }, []);

    const { data: userData, isLoading: isLoadingUserData } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            if (!simpleUserJson) return null;
            const response = await api.get(`/developers/${simpleUserJson.id}`);
            localStorage.setItem("@UserDetails", JSON.stringify(response.data));
            return response.data;
        },
        enabled: !!simpleUserJson,
    });

    return (
        <UserContext.Provider value={""}>
            {children}
        </UserContext.Provider>
    );
};
