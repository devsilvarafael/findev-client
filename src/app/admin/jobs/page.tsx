"use client";

import JobCardItem from "@/components/Jobs/JobCardItem";
import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import api from "@/services/api";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";

const AdminJobsPage = (): JSX.Element => {
  const { data: companyJobs, isLoading: isLoadingCompanyJobs } = useQuery({
    queryKey: ["admin-recruiters"],
    queryFn: async () => {
      const existsStorage: string | null = localStorage.getItem("@UserDetails");
      const user = existsStorage ? JSON.parse(existsStorage) : null;

      const response = await api.get(`/jobs/company/${user?.company?.id}`);
      return response.data;
    },
  });

  if (isLoadingCompanyJobs) {
    return <p>Carregando</p>;
  }

  return (
    <DefaultLayout leftSideBar={<Menu />}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Vagas anúnciadas</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {!isLoadingCompanyJobs &&
            companyJobs?.content.map((job: Job) => (
              <JobCardItem job={job} key={job.id} />
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminJobsPage;
