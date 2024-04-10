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
    <div className="flex flex-row space-y-4">
      {leftSideBar}
      <div className="w-full flex flex-col flex-1 ml-4">{children}</div>
    </div>
  );
};
