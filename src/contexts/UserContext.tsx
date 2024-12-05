"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type SimpleUserType = { id: string; role: string; email: string }

const UserContext = createContext<any>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [simpleUserJson, setSimpleUserJson] = useState<SimpleUserType | null>(null);

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

            const userRole = simpleUserJson.role === "RECRUITER" ? "/recruiters" : "/developers";

            const response = await api.get(`${userRole}/${simpleUserJson.id}`);
            localStorage.setItem("@UserDetails", JSON.stringify(response.data));
            return response.data;
        },
        enabled: !!simpleUserJson,
    });

    return (
        <UserContext.Provider value={{ simpleUserJson, userData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}