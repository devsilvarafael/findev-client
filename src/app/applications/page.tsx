"use client";

import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

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
        <DefaultLayout leftSideBar={<Menu />}>
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
