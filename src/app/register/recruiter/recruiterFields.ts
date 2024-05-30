// recruiterFields.ts

import { FormField } from "@/components/Forms/RegisterForm";

export const recruiterFields = {
  account: [
    {
      name: "firstName",
      placeholder: "First Name",
      type: "text",
      label: "Primeiro nome",
      required: true,
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
      label: "Segundo nome",
      required: true,
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      label: "Senha",
      required: true,
    },
    {
      name: "phone",
      placeholder: "Phone",
      type: "text",
      label: "Telefone",
      required: true,
    },
  ] as FormField[],

  company: [
    {
      name: "companyName",
      placeholder: "Company Name",
      type: "text",
      label: "Company Name",
      required: true,
    },
    {
      name: "industry",
      placeholder: "Select Industry",
      type: "select",
      label: "Industry",
      required: true,
      items: [
        { value: "tech", label: "Technology" },
        { value: "finance", label: "Finance" },
        { value: "healthcare", label: "Healthcare" },
        // Add more industries as needed
      ],
    },
    {
      name: "companySize",
      placeholder: "Select Company Size",
      type: "select",
      label: "Company Size",
      required: true,
      items: [
        { value: "small", label: "1-50 employees" },
        { value: "medium", label: "51-200 employees" },
        { value: "large", label: "201+ employees" },
      ],
    },
    {
      name: "website",
      placeholder: "Company Website",
      type: "text",
      label: "Company Website",
      required: false,
    },
  ] as FormField[],
};
