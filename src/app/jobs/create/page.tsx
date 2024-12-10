"use client";

import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

import JobCardItem from "@/components/Jobs/JobCardItem";
import { JobForm } from "@/components/Jobs/JobForm";

export default function Page({ params }: any): JSX.Element {
    return (
        <DefaultLayout leftSideBar={<Menu />}>
            <div>
                <h1 className="text-2xl font-bold mb-6">Criar Vaga</h1>
                <JobForm />
            </div>
        </DefaultLayout>
    );
}
