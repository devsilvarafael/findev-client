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
  return (
    <DefaultLayout leftSideBar={<Menu />}>
      <p>oi</p>
    </DefaultLayout>
  );
};

export default AdminPage;
