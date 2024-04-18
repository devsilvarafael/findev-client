import { RegisterLayoutProps } from "@/types/RegisterLayout";

export const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full justify-center items-center">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
