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

export default function Page({ params }: any): JSX.Element {
  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Meus anúncios</h1>
          {/* <JobCreateDialog fetchJobs={fetchJobs} /> */}
        </div>

        {/* <JobsList jobs={jobs} fetchJobs={fetchJobs} /> */}
      </div>
    </DefaultLayout>
  );
}
