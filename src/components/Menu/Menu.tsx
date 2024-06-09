"use client";

import { IMenuProps } from "@/types/Menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BriefcaseIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

export const Menu = ({ items }: IMenuProps) => {
  return (
    <div className=" flex flex-col px-4 h-screen bg-gray-900 text-white py-6">
      <div className="h-full flex flex-col items-center space-y-12">
        {/* User Profile */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold">Rafael Silva</p>
          <p className="text-sm text-gray-400">Front-end Developer</p>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 w-full">
          {items.map((item, index) => (
            <li key={index} className="w-full">
              <a
                href={item.path}
                className="flex items-center p-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-lg"
              >
                {getMenuIcon(item.label)}
                <span className="ml-3">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Additional Links */}
        <div className="mt-auto flex flex-col space-y-2 w-full">
          <a
            href="/admin"
            className="flex items-center p-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-lg"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="ml-3">Configurações</span>
          </a>
          <a
            href="/"
            className="flex items-center p-2 text-sm font-medium text-gray-200 hover:bg-gray-700 rounded-lg"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="ml-3">Sair</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const getMenuIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "vagas":
      return <BriefcaseIcon className="w-5 h-5" />;
    case "perfil":
      return <UserIcon className="w-5 h-5" />;
    default:
      return <HomeIcon className="w-5 h-5" />;
  }
};
