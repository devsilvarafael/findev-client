"use client";
import { Fragment, useState } from "react";
import { NextPage } from "next";
import "tailwindcss/tailwind.css";
import { useCurrentForm } from "@/contexts/CurrentFormContext";
import api from "@/services/api";
import Select from "react-select";
import { technologyOptions } from "@/app/register/developer/technologyOptions";

export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  items?: {
    value: string | number;
    label: string;
  }[];
}

interface RegisterFormProps {
  formFields: FormField[];
}

export const RegisterForm: NextPage<RegisterFormProps> = ({ formFields }) => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfileOptions, setSelectedProfileOptions] = useState({
    skills: [],
    seniority: {
      value: "",
    },
  });
  const { currentFormId, updateCurrentForm } = useCurrentForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSelectChange = (selectedOption: any, fieldName: string) => {
    setSelectedProfileOptions({
      ...selectedProfileOptions,
      [fieldName]: selectedOption,
    });
  };

  const submitData = async () => {
    try {
      setIsSubmitting(true);

      const formattedDeveloperJson = {
        ...form,
        seniority: selectedProfileOptions.seniority.value,
        skills: selectedProfileOptions.skills.map(
          (skill: { value: string; label: string }) => ({
            name: skill.value,
            experienceYears: 0,
          })
        ),
      };

      const response = await api.post("/developers", formattedDeveloperJson);

      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-2 min-w-[500px]">
      <div className="flex flex-col w-full h-full p-8 space-y-4  border-main min-h-[550px] border-l-2 max-w-md mx-auto justify-between">
        <h2 className="text-xl font-bold text-center">Agora falta pouco!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {formFields.map((field: FormField) => (
            <Fragment>
              {field.type === "select" && (
                <Select
                  options={field.items}
                  isMulti={field.name === "skills"}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, field.name)
                  }
                  placeholder={field.placeholder}
                />
              )}

              {field.type !== "select" && (
                <input
                  key={field.name}
                  className="w-full px-3 py-2 border rounded-md"
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  onChange={handleChange}
                />
              )}
            </Fragment>
          ))}
        </form>
        <div>
          <button
            className="w-full px-3 py-2 mt-4 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            onClick={() =>
              currentFormId === 1 ? submitData : updateCurrentForm(1)
            }
            disabled={isSubmitting}
          >
            {currentFormId === 1 && "Cadastrar"}
            {currentFormId !== 1 && "Próximo"}
            {isSubmitting && "Aguarde..."}
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
