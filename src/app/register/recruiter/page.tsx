"use client";

import { RegisterForm } from "@/components/Forms/RegisterForm";
import { RegisterLayout } from "@/layouts/RegisterLayout";
import { recruiterFields } from "./recruiterFields";
import { TabsForm } from "@/components/Forms/Tabs";
import { CurrentFormProvider } from "@/contexts/CurrentFormContext";
import api from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const submitRecruiterData = async (data: any) => {
  const router = useRouter();

  try {
    const formattedRecruiterJson = {
      ...data,
      companyName: data.companyName,
      industry: data.industry.value,
    };

    const response = await api.post("/recruiters", formattedRecruiterJson);

    if (response.status === 201) {
      toast.success("Cadastro realizado com sucesso");
      router.push("/");
      return;
    }
  } catch (error) {
    toast.error("Erro ao realizar cadastro");
  }
};

export default function Recruiter() {
  return (
    <CurrentFormProvider>
      <RegisterLayout>
        <TabsForm
          forms={[
            <RegisterForm
              formFields={recruiterFields.account}
              onSubmit={submitRecruiterData}
            />,
            <RegisterForm
              formFields={recruiterFields.company}
              onSubmit={submitRecruiterData}
            />,
          ]}
          tabs={[
            { name: "Conta", id: 0 },
            { name: "Empresa", id: 1 },
          ]}
        />
      </RegisterLayout>
    </CurrentFormProvider>
  );
}
