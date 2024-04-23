"use client";
import { useState } from "react";
import { NextPage } from "next";
import "tailwindcss/tailwind.css";
import { useCurrentForm } from "@/contexts/CurrentFormContext";
import api from "@/services/api";

export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  label: string;
}

interface RegisterFormProps {
  formFields: FormField[];
}

export const RegisterForm: NextPage<RegisterFormProps> = ({ formFields }) => {
  const [form, setForm] = useState({});
  const { currentFormId } = useCurrentForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const submitData = async () => {
    const response = await api.get("/developers");

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-between py-2 min-w-[500px]">
      <div className="flex flex-col w-full h-full p-8 space-y-4  border-main min-h-[550px] border-l-2 max-w-md mx-auto justify-between">
        <h2 className="text-xl font-bold text-center">
          Olá, agora falta pouco!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {formFields.map((field: FormField) => (
            <input
              key={field.name}
              className="w-full px-3 py-2 border rounded-md"
              type={field.type}
              name={field.name}
              placeholder={field.label}
              onChange={handleChange}
            />
          ))}
        </form>
        <div>
          <button
            className="w-full px-3 py-2 mt-4 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            onClick={currentFormId === 1 ? submitData : undefined}
          >
            {currentFormId === 1 && "Cadastrar"}
            {currentFormId !== 1 && "Próximo"}
          </button>
          <p className="text-sm text-center">
            Já possui uma conta?{" "}
            <a href="#" className="text-purple-600 underline">
              Faça login!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
