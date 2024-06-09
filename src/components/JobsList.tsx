"use client";

import { FC, useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { Job } from "@/types/Job";

export const JobsList: FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  async function fetchJobs() {
    try {
      const response = await fetch("http://localhost:8080/api/jobs");

      if (!response.ok) {
        throw new Error("Erro ao buscar vagas");
      }

      const data = await response.json();

      setJobs(data.content);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};
