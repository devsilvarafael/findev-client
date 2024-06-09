import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { SearchBar } from "@/components/SearchBar";
import { JobsList } from "@/components/JobsList";
import { useEffect, useState } from "react";

export default async function Page({ params }: any): Promise<JSX.Element> {
  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Meus anúncios</h1>
        <SearchBar />
        <JobsList />
      </div>
    </DefaultLayout>
  );
}
