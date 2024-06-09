"use client";

import { RegisterForm } from "@/components/Forms/RegisterForm";
import { RegisterLayout } from "@/layouts/RegisterLayout";
import { developerFields } from "./developerFields";
import { TabsForm } from "@/components/Forms/Tabs";
import { CurrentFormProvider } from "@/contexts/CurrentFormContext";
import api from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Developer() {
  const router = useRouter();

  const submitDeveloperData = async (data: any) => {
    try {
      const formattedDeveloperJson = {
        ...data,
        seniority: data.seniority.value,
        skills: data.skills.map((skill: { value: string; label: string }) => ({
          name: skill.value,
          experienceYears: 0,
        })),
      };

      const response = await api.post("/developers", formattedDeveloperJson);

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso");
        router.push("/");
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro");
    }
  };

  return (
    <CurrentFormProvider>
      <RegisterLayout>
        <TabsForm
          forms={[
            <RegisterForm
              formFields={developerFields.account}
              onSubmit={submitDeveloperData}
            />,
            <RegisterForm
              formFields={developerFields.skills}
              onSubmit={submitDeveloperData}
            />,
          ]}
          tabs={[
            { name: "Conta", id: 0 },
            { name: "Skills/Portfolio", id: 1 },
          ]}
        />
      </RegisterLayout>
    </CurrentFormProvider>
  );
}
