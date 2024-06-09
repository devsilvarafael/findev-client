"use client";

import { FC } from "react";
import { DataTable } from "./DataTable";

interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface CompaniesListProps {
  companies: Company[];
}

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];

export const CompaniesList: FC<CompaniesListProps> = ({ companies }) => {
  return <DataTable columns={columns} data={companies} />;
};
