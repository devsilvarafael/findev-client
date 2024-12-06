"use client";

import { Menu } from "@/components/Menu/Menu";
import { DefaultLayout } from "@/layouts/DefaultLayout";

const AdminPage = (): JSX.Element => {
  return (
    <DefaultLayout leftSideBar={<Menu />}>
      <p>oi</p>
    </DefaultLayout>
  );
};

export default AdminPage;
