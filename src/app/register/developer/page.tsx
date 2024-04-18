import { RegisterForm } from "@/components/Forms/RegisterForm";
import { RegisterLayout } from "@/layouts/RegisterLayout";
import { developerFields } from "./developerFields";
import { TabsForm } from "@/components/Forms/Tabs";

export default function Developer() {
  return (
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
  );
}
