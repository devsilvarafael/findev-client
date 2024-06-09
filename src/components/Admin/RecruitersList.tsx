"use client";

import { FC, useState } from "react";
import { DataTable } from "./DataTable";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FormDialog } from "./FormDialog";
import api from "@/services/api";

interface Recruiter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

interface RecruitersListProps {
  recruiters: Recruiter[];
  refresh: () => Promise<void>;
}

export const RecruitersList: FC<RecruitersListProps> = ({
  recruiters,
  refresh,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null
  );

  const handleEdit = (recruiter: Recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/recruiters/${id}`);
      await refresh();
    } catch (error) {
      console.error("Error deleting recruiter:", error);
    }
  };

  const closeDialog = () => {
    setSelectedRecruiter(null);
    setIsDialogOpen(false);
  };

  const handleSaveRecruiter = async (data: any) => {
    const jsonAPI = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company.id,
    };
    try {
      await api.put(`/recruiters/${data.recruiterId}`, jsonAPI);
      await refresh();
      closeDialog();
    } catch (error) {
      console.error("Error saving recruiter data:", error);
    }
  };

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
    {
      accessorKey: "actions",
      header: "Ações",
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
            onClick={() => handleDelete(row.original.recruiterId)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={recruiters} />
      {selectedRecruiter && (
        <FormDialog
          formTitle="Edit Recruiter"
          initialData={selectedRecruiter}
          fields={[
            { name: "firstName", label: "Nome", type: "text" },
            { name: "lastName", label: "Sobrenome", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Telefone", type: "text" },
            { name: "company", label: "Empresa", type: "text" },
          ]}
          onSave={handleSaveRecruiter}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        />
      )}
    </>
  );
};
