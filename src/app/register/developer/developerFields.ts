import { technologyOptions } from "./technologyOptions";

export const developerFields = {
  account: [
    {
      name: "firstName",
      label: "Primeiro nome",
      type: "text",
      placeholder: "Digite seu nome de usuário",
    },
    {
      name: "lastName",
      label: "Último nome",
      type: "text",
      placeholder: "Digite seu sobrenome",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
    },
    {
      name: "phone",
      label: "Telefone",
      type: "text",
      placeholder: "Insira seu número de contato",
    },

    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
    },
  ],
  skills: [
    {
      name: "portfolio",
      label: "Portfolio",
      type: "text",
      placeholder: "Digite seu portfolio",
    },
    {
      name: "skills",
      label: "Skills",
      type: "select",
      placeholder: "Selecione suas skills",
      items: technologyOptions,
    },
    {
      name: "seniority",
      label: "Senioridade",
      type: "select",
      placeholder: "Selecione sua senioridade",
      items: [
        { value: 0, label: "Junior" },
        { value: 1, label: "Pleno" },
        { value: 2, label: "Senior" },
        { value: 3, label: "Especialista" },
      ],
    },
  ],
};
