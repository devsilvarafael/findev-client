"use client";

import JobCardItem from "@/components/Jobs/JobCardItem";
import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import api from "@/services/api";
import { Developer } from "@/types/Developer";
import { Job } from "@/types/Job";
import { useQuery } from "@tanstack/react-query";

interface ApplicantProps {
  candidatureId: string;
  developer: Developer;
  status: string;
}

const AdminJobsCandidatesPage = ({ params }: any): JSX.Element => {
  console.log("my params", params);

  const { data: jobApplicants, isLoading: isLoadingJobApplicants } = useQuery({
    queryKey: ["admin-recruiters"],
    queryFn: async () => {
      const response = await api.get(`/candidature/job/${params.jobId}`);
      return response.data;
    },
  });

  if (isLoadingJobApplicants) return <p>Carregando</p>;

  return (
    <DefaultLayout leftSideBar={<Menu />}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Vagas anúnciadas</h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* {jobApplicants?.content.map((job: Job) => (
            <JobCardItem job={job} />
          ))} */}

          {jobApplicants?.content.map((application: ApplicantProps) => (
            <p key={application.candidatureId}>
              {application?.developer?.firstName}
            </p>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminJobsCandidatesPage;
