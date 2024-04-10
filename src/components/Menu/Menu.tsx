"use client";

import { IMenuProps } from "@/types/Menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Menu = ({ items }: IMenuProps) => {
  return (
    <div className="max-w-28  flex flex-col px-3 h-screen bg-main text-white py-4">
      <div className=" h-full flex flex-col items-center space-y-12">
        <div className="flex flex-col items-center space-y-4 w-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p className="text-sm">Rafael Silva</p>
          <p className="text-sm text-center">Front-end developer</p>
        </div>

        <ul>
          <li className="flex flex-col">
            {items.map((item) => (
              <span>{item.label}</span>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};
