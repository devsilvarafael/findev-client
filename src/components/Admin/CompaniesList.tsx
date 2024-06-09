"use client";

import { FC, useState } from "react";
import { DataTable } from "./DataTable";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FormDialog } from "./FormDialog";
import api from "@/services/api";

interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface CompaniesListProps {
  companies: Company[];
  refresh: () => Promise<void>;
}

export const CompaniesList: FC<CompaniesListProps> = ({
  companies,
  refresh,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/companies/${id}`);
      await refresh();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const closeDialog = () => {
    setSelectedCompany(null);
    setIsDialogOpen(false);
  };

  const handleSaveCompany = async (data: any) => {
    try {
      await api.put(`/companies/${data.id}`, data);
      await refresh();
      closeDialog();
    } catch (error) {
      console.error("Error saving company data:", error);
    }
  };

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
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            className="text-orange-500 bg-orange-100"
            size="icon"
            onClick={() => handleEdit(row.original)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            className="text-red-800 bg-red-100 hover:text-red-300"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={companies} />
      {selectedCompany && (
        <FormDialog
          formTitle="Edit Company"
          initialData={selectedCompany}
          fields={[
            { name: "name", label: "Fantasia/Razao", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "address", label: "Endereco", type: "text" },
            { name: "website", label: "Site", type: "text" },
          ]}
          onSave={handleSaveCompany}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        />
      )}
    </>
  );
};
