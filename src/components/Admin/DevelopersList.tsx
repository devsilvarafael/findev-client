"use client";

import { FC, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skill } from "@/types/Skill";
import { Developer } from "@/types/Developer";
import { FormDialog } from "./FormDialog";
import api from "@/services/api";

interface DevelopersListProps {
  developers: Developer[];
  refresh: () => Promise<void>;
}

export const DevelopersList: FC<DevelopersListProps> = ({
  developers,
  refresh,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
    null
  );

  const handleEdit = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedDeveloper(null);
    setIsDialogOpen(false);
  };

  const seniorityColors: {
    [key: number]: { background: string; text: string };
  } = {
    0: {
      background: "bg-green-100",
      text: "text-green-800",
    },
    1: {
      background: "bg-yellow-100",
      text: "text-yellow-800",
    },
    2: {
      background: "bg-red-100",
      text: "text-red-800",
    },
  };

  const handleSaveDeveloper = async (data: any) => {
    const jsonAPI = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      portfolio: data.portfolio,
      phone: data.phone,
      password: "1235",
      skills: data.skills,
    };

    try {
      await api.put(`/developers/${data.developerId}`, jsonAPI);
      await refresh();
    } catch (error) {
      console.error("Error saving developer data:", error);
    }
  };

  const handleDeleteDeveloper = async (developerId: number) => {
    try {
      await api.delete(`/developers/${developerId}`);
      await refresh();
    } catch (error) {
      console.error("Error deleting developer:", error);
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
      accessorKey: "seniority",
      header: "Senioridade",
      cell: ({ row }: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            seniorityColors[row.original.seniority].background
          } ${seniorityColors[row.original.seniority].text}`}
        >
          {row.original.seniority === 0
            ? "Junior"
            : row.original.seniority === 1
            ? "Pleno"
            : "Senior"}
        </span>
      ),
    },
    {
      accessorKey: "skills",
      header: "Skills",
      cell: ({ row }: any) => (
        <div className="flex flex-wrap gap-2">
          {row.original.skills.map((skill: Skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {skill.name.toLowerCase()}{" "}
              {skill.experienceYears > 0 &&
                `(${skill.experienceYears} ${
                  skill.experienceYears > 1 ? "anos" : "ano"
                })`}
            </span>
          ))}
        </div>
      ),
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
            onClick={() => handleDeleteDeveloper(row.original.developerId)}
            size="icon"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={developers} />
      {selectedDeveloper && (
        <FormDialog
          formTitle="Edit Developer"
          initialData={selectedDeveloper}
          fields={[
            { name: "firstName", label: "Nome", type: "text" },
            { name: "lastName", label: "Sobrenome", type: "text" },
            { name: "email", label: "Email", type: "email" },
          ]}
          onSave={handleSaveDeveloper}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        />
      )}
    </>
  );
};
