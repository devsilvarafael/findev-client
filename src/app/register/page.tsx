"use client";

import { UserProfileTypeCard } from "@/components/UserProfileTypeCard/UserProfileTypeCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { userTypeOptions } from "./userTypeOptions";

export default function Register() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const handleSelectCard = (id: string) => {
    setSelectedUserType(id);
  };

  return (
    <main className="flex h-screen w-screen items-center justify-between px-20 gap-4">
      <aside className="h-3/4 w-1/2  flex flex-col justify-center items-center">
        <div className="max-w-xl flex flex-col w-full h-full justify-evenly">
          <div className="text-center flex flex-col items-center gap-4">
            <h3>Estamos quase lá!</h3>
            <Image
              src="/findev-medium-logo.svg"
              width={140}
              height={140}
              alt="findev-logo"
            />

            <p>
              Você esta buscando por uma vaga ou desenvolvedores talentosos?
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {userTypeOptions.map((userType) => (
              <UserProfileTypeCard
                key={userType.id}
                id={userType.id}
                title={userType.title}
                selectedId={selectedUserType}
                subtitle={userType.subtitle}
                avatars={userType.avatars}
                onSelectCard={() => handleSelectCard(userType.id)}
              />
            ))}
          </div>

          <Button className="bg-main">Continuar</Button>

          <p className="text-center">
            Já possuí uma conta? <span>Faça login!</span>
          </p>
        </div>
      </aside>
      <aside className="flex flex-col h-3/4 w-1/2  justify-center items-center space-y-2">
        <div className="w-full max-w-2xl">
          <h1 className="font-poppins font-bold text-3xl  text-center">
            findev.com, conectando talentos e recrutadores as melhores
            oportunidades.
          </h1>
        </div>

        <Image
          src="/register-hero-1.svg"
          width={600}
          height={600}
          alt="illustration-person-with-laptop"
        />
      </aside>
    </main>
  );
}
