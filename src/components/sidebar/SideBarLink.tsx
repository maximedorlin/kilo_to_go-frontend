"use client";

import Link from "next/link";
import React from "react";

interface Props {
  active?: boolean;
  title: string;
}
const SideBarLink: React.FC<Props> = (props) => {
  return (
    <li
      className={`block pl-9 first:pt-4 last:pb-4 relative before:absolute first:before:top-4 before:top-0 before:left-4 before:w-[3px] ${
        props.active && "before:bg-primary"
      } first:before:h-[calc(100%-16px)] before:h-full`}
    >
      <Link href="#">
        <div
          className={`text-sm capitalize font-normal flex gap-3 items-center transition-all duration-150 rounded dark:hover:text-blue-500 ${
            props.active && "text-blue-500"
          }`}
        >
          <span className="flex-1 truncate">{props.title}</span>
        </div>
      </Link>
    </li>
  );
};

export default SideBarLink;
