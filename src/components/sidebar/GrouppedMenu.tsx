"use client";

import { useAppSelector } from "@/hooks/redux-toolkit";
// import { useAppSelector } from "@/hooks/reduxhooks";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}
const GrouppedMenu: React.FC<Props> = (props) => {
  const navExpend = useAppSelector((state) => state.theme.navExpend);

  return (
    <div>
      {navExpend && (
        <p className="font-semibold text-sm">{props.title.toUpperCase()}</p>
      )}
      <div className="my-2">{props.children}</div>
    </div>
  );
};

export default GrouppedMenu;
