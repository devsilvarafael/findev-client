"use client";

import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import JobCardItem from "@/components/Jobs/JobCardItem";
import { useSearchParams } from "next/navigation"; // Import the correct hook

export default function Page({ params }: any): JSX.Element {
  const searchParams = useSearchParams(); // Use this for query parameters
  const jobId = searchParams.get("jobId"); // Retrieve the jobId parameter

  const { data: recruiterJobs, isLoading: isLoadingRecruiterJobs } = useQuery({
    queryKey: ["recruiter-jobs", jobId], // Add jobId as a dependency
    queryFn: async () => {
      const existsStorage: string | null = localStorage.getItem("@User");
      const user = existsStorage ? JSON.parse(existsStorage) : null;

      if (!jobId) {
        throw new Error("Job ID is required");
      }

      const response = await api.get(`/candidates/job/${jobId}`);

      return response.data;
    },
    enabled: !!jobId, // Only fetch if jobId is available
  });

  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Meus anúncios</h1>
          {/* <JobCreateDialog fetchJobs={fetchJobs} /> */}
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
