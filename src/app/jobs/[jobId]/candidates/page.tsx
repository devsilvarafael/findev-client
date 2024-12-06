"use client";

import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import JobCardItem from "@/components/Jobs/JobCardItem";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: any): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data: recruiterJobs, isLoading: isLoadingRecruiterJobs } = useQuery({
    queryKey: ["recruiter-jobs", jobId],
    queryFn: async () => {
      const existsStorage: string | null = localStorage.getItem("@User");
      const user = existsStorage ? JSON.parse(existsStorage) : null;

      if (!jobId) {
        throw new Error("Job ID is required");
      }

      const response = await api.get(`/candidates/job/${jobId}`);

      return response.data;
    },
    enabled: !!jobId,
  });

  return (
    <DefaultLayout leftSideBar={<Menu />}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Meus anúncios</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {recruiterJobs?.content.map((job: Job) => (
            <JobCardItem key={job.id} job={job} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
