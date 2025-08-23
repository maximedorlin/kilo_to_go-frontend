"use client";
import React, { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

const AccordionLevelTwoMenu: React.FC<Props> = ({
  children,
  title,
  active,
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`block pl-9 first:pt-4 last:pb-4 relative before:absolute first:before:top-4 before:top-0 before:left-4 before:w-[3px] ${
        active && "before:bg-blue-500"
      } first:before:h-[calc(100%-16px)] before:h-full`}
    >
      <div
        className={`cursor-pointer w-full text-sm capitalize font-normal flex justify-between gap-3 items-center  rounded dark:hover:text-blue-500 ${
          active && "text-blue-500"
        }`}
      >
        <p className="flex-1 truncate">{title}</p>
        {open ? (
          <MdKeyboardArrowDown
            className={`flex-1 ${open ? "text-gray" : "text-slate-500"} `}
          />
        ) : (
          <MdKeyboardArrowRight
            className={`flex-1 ${open ? "text-gray" : "text-slate-500"} `}
          />
        )}
      </div>
      <div
        ref={contentRef}
        className={`children-container rounded-md overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="sub-menu space-y-4 relative before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[3px] before:bg-blue-500/10 before:rounded">
          {children}
        </ul>
      </div>
    </button>
  );
};

export default AccordionLevelTwoMenu;
