"use client";

import { RegisterForm } from "@/components/Forms/RegisterForm";
import { RegisterLayout } from "@/layouts/RegisterLayout";
import { developerFields } from "./developerFields";
import { TabsForm } from "@/components/Forms/Tabs";
import { CurrentFormProvider } from "@/contexts/CurrentFormContext";

export default function Developer() {
  return (
    <CurrentFormProvider>
      <RegisterLayout>
        <TabsForm
          forms={[
            <RegisterForm formFields={developerFields.account} />,
            <RegisterForm formFields={developerFields.skills} />,
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
