"use client";

import { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import { Job } from "@/types/Job";
import { toast } from "sonner";

interface JobEditDialogProps {
  job: Job;
  fetchJobs: () => void;
  onClose: () => void;
}

export const JobEditDialog: FC<JobEditDialogProps> = ({
  job,
  fetchJobs,
  onClose,
}) => {
  const [formData, setFormData] = useState<Job>(job);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jsonAPI = {
      title: formData.title,
      description: formData.description,
      salary: formData.salary,
      expirationDate: formData.expirationDate,
      company: formData.company.id,
      recruiter: formData.recruiter.id,
    };

    try {
      if (formData) {
        await api.put(`/jobs/${formData.id}`, jsonAPI);
        fetchJobs();

        toast.success("Vaga atualizada com sucesso!");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Erro ao atualizar a vaga");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar vaga</DialogTitle>
          <DialogDescription>
            Edite os detalhes abaixo para atualizar a vaga.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salário
            </Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expirationDate" className="text-right">
              Data de Expiração
            </Label>
            <Input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={
                new Date(formData.expirationDate).toISOString().split("T")[0]
              }
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa (ID)
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company.id}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recruiter" className="text-right">
              Recrutador (ID)
            </Label>
            <Input
              id="recruiter"
              name="recruiter"
              value={formData.recruiter.id}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
