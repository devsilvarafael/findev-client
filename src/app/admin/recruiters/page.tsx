"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";

import api from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/Modal/Modal";

const AdminPage = (): JSX.Element => {
  const [selectedRecruiter, setSelectedRecruiter] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: recruiters, isLoading: isLoadingRecruiters } = useQuery({
    queryKey: ["admin-recruiters"],
    queryFn: async () => {
      const existsStorage: string | null = localStorage.getItem("@UserDetails");
      const user = existsStorage ? JSON.parse(existsStorage) : null;

      const response = await api.get(`/admin/recruiters/${user?.company?.id}`);
      return response.data;
    },
  });

  const updateRecruiterMutation = useMutation({
    mutationFn: async (formData: any) => {
      const response = await api.put(`/recruiters/${formData.recruiterId}`, formData);
      return response.data;
    },

    // const response = await api.put(`/recruiters/${formData.recruiterId}`, {
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   avatar: formData.avatar,
    //   phone: formData.phone
    // });
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-recruiters"]
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating recruiter:", error);
    },
  });

  const deleteRecruiterMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/recruiters/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-recruiters"]
      });
    },
    onError: (error) => {
      console.error("Error deleting recruiter:", error);
    },
  });

  const handleEdit = (recruiter: any) => {
    setSelectedRecruiter(recruiter);
    setIsModalOpen(true);
  };

  const handleSave = (formData: any) => {
    updateRecruiterMutation.mutate(formData);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recruiter?")) {
      deleteRecruiterMutation.mutate(id);
    }
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
  ];

  const columns = [
    {
      accessorKey: "firstName",
      header: "Nome",
      cell: ({ row }: any) => {
        const firstName = row.original.firstName;
        const lastName = row.original.lastName;
        return `${firstName} ${lastName}`;
      },
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Telefone" },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-blue-500 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.original.recruiterId)}
            className="text-red-500 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout leftSideBar={<Menu />}>
      {isLoadingRecruiters ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable
            title="Lista de recrutadores"
            data={recruiters?.content || []}
            columns={columns}
          />
          {isModalOpen && selectedRecruiter && (
            <Modal
              open={isModalOpen}
              setModalBehavior={setIsModalOpen}
              description="Mantenha todos os campos do recrutador preenchidos."
              fields={fields}
              state={selectedRecruiter}
              title="Editar Recrutador"
              triggerButton={<></>}
              onSubmit={handleSave}
            />
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default AdminPage;
