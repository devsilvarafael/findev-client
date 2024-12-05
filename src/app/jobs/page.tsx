"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { SearchBar } from "@/components/SearchBar";
import { JobsList } from "@/components/JobsList";
import { JobCreateDialog } from "@/components/JobCreateDialog";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { JobCard } from "@/components/JobCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JobCardItem from "@/components/Jobs/JobCardItem";

export default function Page({ params }: any): JSX.Element {
    const { data: userJobs, isLoading: isLoadingUserJobs } = useQuery({
        queryKey: ["userJobs"],
        queryFn: async () => {
            const existsStorage: string | null = localStorage.getItem("@User")
            const user = existsStorage ? JSON.parse(existsStorage) : null;

            const response = await api.get("/jobs/matching", {
                params: {
                    developerId: user?.id
                }
            })

            return response.data
        },
    })



    return (
        <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
            <div className="p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Vagas Recomendadas</h1>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {userJobs?.content.map((job: Job) => (
                        <JobCardItem job={job} />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}
