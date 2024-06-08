import { FC } from "react";
import { JobCard } from "./JobCard";

interface Job {
  id: number;
  title: string;
  type: string;
  salary: string;
  company: string;
  location: string;
  companyLogo: string;
}

interface JobsListProps {
  jobs: Job[];
}

export const JobsList: FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};
