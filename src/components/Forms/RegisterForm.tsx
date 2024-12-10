"use client";
import { Fragment, useState, useEffect, ReactNode } from "react";
import { NextPage } from "next";
import "tailwindcss/tailwind.css";
import { useCurrentForm } from "@/contexts/CurrentFormContext";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  items?: {
    value: string | number;
    label: string;
  }[];
  required?: boolean;
}

interface RegisterFormProps {
  formFields: FormField[];
  onSubmit: (data: any) => void;
  children?: ReactNode;
}

export const RegisterForm: NextPage<RegisterFormProps> = ({
  formFields,
  onSubmit,
  children
}) => {
  const { currentFormId, updateFormData, formData, updateCurrentForm } =
    useCurrentForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: formData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    updateFormData(getValues());
  }, [getValues]);

  const handleNext = (data: any) => {
    if (currentFormId < 1) {
      updateCurrentForm(currentFormId + 1);
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 min-w-[500px] bg-gray-50">
      <div className="flex flex-col w-full h-full p-8 space-y-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Quase lá!
        </h2>
        <form
          onSubmit={handleSubmit(handleNext)}
          className="flex flex-col gap-4"
        >
          {formFields.map((field: FormField) => (
            <Fragment key={field.name}>
              {field.type === "select" ? (
                <>
                  <Controller
                    control={control}
                    name={field.name}
                    rules={{ required: field.required }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={field.items}
                        isMulti={field.name === "skills"}
                        onChange={(selectedOption) => onChange(selectedOption)}
                        placeholder={field.placeholder}
                        value={value}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                  {children}
                </>
              ) : (
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  type={field.type}
                  {...register(field.name, { required: field.required })}
                  placeholder={field.label}
                />
              )}
              {errors[field.name] && (
                <span className="text-red-800 text-sm">{`${field.label} é obrigatório`}</span>
              )}
            </Fragment>
          ))}
          <button
            className={`w-full px-4 py-2 mt-4 text-white ${!isSubmitting ? "bg-purple-600" : "bg-gray-300"
              } rounded-md ${!isSubmitting ? "hover:bg-purple-700" : ""
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Enviando dados..."
              : currentFormId === 1
                ? "Cadastrar"
                : "Próximo"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Já possuí uma conta?{" "}
            <Link href="/" className="text-purple-600 underline">
              Faça login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
