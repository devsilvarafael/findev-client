// pages/admin/index.tsx

"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DevelopersList } from "@/components/Admin/DevelopersList";
import { RecruitersList } from "@/components/Admin/RecruitersList";
import { CompaniesList } from "@/components/Admin/CompaniesList";

const AdminPage = (): JSX.Element => {
  const [developers, setDevelopers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [companies, setCompanies] = useState([]);

  const fetchDevelopers = async () => {
    const response = await fetch("http://localhost:8080/api/developers");
    const data = await response.json();
    setDevelopers(data.content);
  };

  const fetchRecruiters = async () => {
    const response = await fetch("http://localhost:8080/api/recruiters");
    const data = await response.json();
    setRecruiters(data.content);
  };

  const fetchCompanies = async () => {
    const response = await fetch("http://localhost:8080/api/companies");
    const data = await response.json();
    setCompanies(data.content);
  };

  useEffect(() => {
    fetchDevelopers();
    fetchRecruiters();
    fetchCompanies();
  }, []);

  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administração</h1>
        <Tabs defaultValue="developers">
          <TabsList className="border-2 border-blue-600 ">
            <TabsTrigger value="developers">Desenvolvedores</TabsTrigger>
            <TabsTrigger value="recruiters">Recrutadores</TabsTrigger>
            <TabsTrigger value="companies">Empresas</TabsTrigger>
          </TabsList>
          <TabsContent value="developers">
            <DevelopersList developers={developers} />
          </TabsContent>
          <TabsContent value="recruiters">
            <RecruitersList recruiters={recruiters} />
          </TabsContent>
          <TabsContent value="companies">
            <CompaniesList companies={companies} />
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default AdminPage;
