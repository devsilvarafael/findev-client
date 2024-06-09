"use client";

import { FC } from "react";
import { DataTable } from "./DataTable";

interface Recruiter {
  id: string;
  name: string;
  email: string;
}

interface RecruitersListProps {
  recruiters: Recruiter[];
}

const columns = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }: any) =>
      `${row.original.firstName} ${row.original.lastName}`,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "company",
    header: "Empresa",
    cell: ({ row }: any) => row.original.company.name,
  },
];

export const RecruitersList: FC<RecruitersListProps> = ({ recruiters }) => {
  return <DataTable columns={columns} data={recruiters} />;
};
