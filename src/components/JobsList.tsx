"use client";

import { useState } from "react";
import { FC } from "react";
import { JobCard } from "./JobCard";
import { Job } from "@/types/Job";

import api from "@/services/api";
import { JobEditDialog } from "./JobEditingDialog";
import { toast } from "sonner";

interface JobsListProps {
  jobs: Job[];
  fetchJobs: () => void;
}

export const JobsList: FC<JobsListProps> = ({ jobs, fetchJobs }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
      toast.success("Vaga deletada com sucesso!");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
  };

  const closeEditDialog = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            {...job}
            onDelete={handleDelete}
            onEdit={handleEdit}
            company={job.company}
          />
        ))}
      </div>
      {selectedJob && (
        <JobEditDialog
          job={selectedJob}
          fetchJobs={fetchJobs}
          onClose={closeEditDialog}
        />
      )}
    </>
  );
};
