import { ReactNode } from "react";

interface DefaultLayoutProps {
  leftSideBar: ReactNode;
  children: ReactNode;
}

export const DefaultLayout = ({
  leftSideBar,
  children,
}: DefaultLayoutProps): JSX.Element => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64">{leftSideBar}</aside>
      <main className="flex-1 overflow-auto p-6 bg-gray-100">{children}</main>
    </div>
  );
};
