"use client";

import { useAppSelector } from "@/hooks/redux-toolkit";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  Icon: IconType;
  active?: boolean;
}

const SimpleNoAccordion: React.FC<Props> = ({ Icon, title, active }) => {
  const navExpend = useAppSelector((state) => state.theme.navExpend);

  return (
    <Link
      href={""}
      className={`group w-full h-[45px]  flex items-center hover:bg-gradient-to-r hover:from-green-200 hover:via-red-200 hover:to-yellow-200  hover:text-primary px-2   cursor-pointer my-2 ${
        active && "bg-gradient-to-r from-green-200 via-red-200 to-yellow-200"
      } ${
        navExpend
          ? " justify-between rounded-lg "
          : "justify-center  rounded-full h-[45px] w-[45px] mx-auto"
      }`}
    >
      <div
        className={`flex gap-x-3 group-hover:text-primary group-hover:font-bold  ${
          active ? "text-primary font-bold" : "text-slate-500 font-medium"
        }`}
      >
        <Icon className={`text-xl ${active && "font-bold"}`} />
        {navExpend && <div className="text-sm capitalize">{title}</div>}
      </div>
    </Link>
  );
};

export default SimpleNoAccordion;
