"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type SimpleUserType = {
    id: string;
    role: "RECRUITER" | "DEVELOPER" | "ADMIN";
    email: string;
};

type UserContextType = {
    simpleUserJson: SimpleUserType | null;
    userData: any | null;
    isLoadingUserData: boolean;
    refetchUserData: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [simpleUserJson, setSimpleUserJson] = useState<SimpleUserType | null>(null);
    const [userDetailsInLocalStorage, setUserDetailsInLocalStorage] = useState<boolean>(
        !!localStorage.getItem("@UserDetails")
    );

    const isLogged = !!localStorage.getItem("authToken");

    const getUserRoleEndpoint = (role: string) => {
        switch (role) {
            case "RECRUITER":
                return "/recruiters";
            case "DEVELOPER":
                return "/developers";
            case "ADMINISTRATOR":
                return "/admin";
            default:
                throw new Error(`Unknown role: ${role}`);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("@User");
        if (storedUser) {
            setSimpleUserJson(JSON.parse(storedUser) as SimpleUserType);
        }
    }, []);

    const { data: userData, isLoading: isLoadingUserData, refetch: refetchUserData } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            if (!simpleUserJson) return null;

            const userRoleEndpoint = getUserRoleEndpoint(simpleUserJson.role);
            const response = await api.get(`${userRoleEndpoint}/${simpleUserJson.id}`);
            localStorage.setItem("@UserDetails", JSON.stringify(response.data));
            return response.data;
        },
        enabled: !!simpleUserJson && isLogged,
        refetchOnWindowFocus: true
    });

    return (
        <UserContext.Provider value={{ simpleUserJson, userData, isLoadingUserData, refetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};
