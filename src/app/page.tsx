"use client";
import { LoginForm } from "@/components/Forms/LoginForm";
import api from "@/services/api";
import { AxiosError } from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        "email": user.email,
        "password": user.password
      })

      if (response.status === 200) {
        localStorage.setItem("@User", (JSON.stringify({
          id: response.data.id,
          role: response.data.role,
          email: response.data.name
        })))

        localStorage.setItem("authToken", JSON.stringify(response.data.token))

        if (response.data.role === "DEVELOPER") {
          router.push("/jobs")
        }

        if (response.data.role === "RECRUITER") {
          router.push("/jobs/announces")
        }
      }

      return response.data
    } catch (err: any) {
      toast.error(err)
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-between px-20 gap-4">
      <aside className="h-3/4 w-1/2 flex justify-center items-center">
        <Image
          src="/illustrations/stars-illustration.png"
          width={400}
          height={400}
          alt="Stars Illustration"
        />
      </aside>
      <aside className="flex flex-col h-3/4 w-1/2  justify-center items-center space-y-2">
        <Image
          src={"/findev-minimal-logo.svg"}
          width={60}
          height={60}
          alt="Findev Logo"
        />

        <h2 className="text-2xl font-bold">Bem-vindo!</h2>
        <p>Faça login na sua conta.</p>

        <LoginForm
          user={user}
          onSubmit={handleSubmitForm}
          onChange={handleChangeForm}
        />
      </aside>
    </main>
  );
}
