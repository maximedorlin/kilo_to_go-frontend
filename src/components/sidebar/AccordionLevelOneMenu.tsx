"use client";

import { useAppSelector } from "@/hooks/redux-toolkit";
import React, { useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  title: string;
  Icon: IconType;
  children: React.ReactNode;
}

const AccordionLevelOneMenu: React.FC<Props> = ({ Icon, children, title }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const navExpend = useAppSelector((state) => state.theme.navExpend);

  const [_, setDropdownPosition] = useState<"above" | "below">("below");
  const handleMouseEnter = () => {
    if (!navExpend) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!navExpend) {
      setOpen(false);
    }
  };

  const handleBlur = () => {
    if (!navExpend) {
      setOpen(false);
    }
  };

  // Effect to determine dropdown position
  useEffect(() => {
    if (open) {
      const parentRect = contentRef.current?.getBoundingClientRect();
      const spaceBelow = window.innerHeight - (parentRect?.bottom || 0);
      // const spaceAbove = parentRect?.top || 0;

      // Check if there's enough space below
      if (spaceBelow < 200) {
        // Adjust this value based on your dropdown height
        setDropdownPosition("above");
      } else {
        setDropdownPosition("below");
      }
    }
  }, [open]);

  return (
    <div
      className="my-2 relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      <button
        className={`w-full flex items-center group-hover:bg-gradient-to-r group-hover:from-green-200 group-hover:via-red-200 group-hover:to-yellow-200 group-hover:text-primary group-hover:font-bold px-2 h-14  cursor-pointer ${
          open && "bg-gradient-to-r from-green-200 via-red-200 to-yellow-200"
        } ${
          navExpend
            ? " justify-between rounded-[3px]"
            : "justify-center  rounded-full h-[45px] w-[45px] mx-auto"
        }`}
        onClick={() => setOpen(!open)}
      >
        <div
          className={`flex gap-x-3 group-hover:font-bold   ${
            open ? "text-primary font-bold" : "font-medium"
          }`}
        >
          <Icon
            className={`text-xl ${
              open && "text-primary"
            } group-hover:text-primary`}
          />
          {navExpend && <div className="text-sm capitalize">{title}</div>}
        </div>
        {navExpend && (
          <>
            {open ? (
              <MdKeyboardArrowDown
                className={` ${
                  open ? "text-primary" : "text-slate-500"
                } group-hover:text-primary`}
              />
            ) : (
              <MdKeyboardArrowRight
                className={` ${
                  open ? "text-primary" : "text-slate-500"
                } group-hover:text-primary`}
              />
            )}
          </>
        )}
      </button>

      {/* Dropdown Positioning */}
      {/* {!navExpend && open && (
        <div
          ref={contentRef}
          className={`p-4 absolute z-50 bg-white shadow-lg w-[270px] left-[45px] border-solid border-2 border-slate-100 h-[200px] overflow-y-auto sidebar`}
          style={{
            top: dropdownPosition === "above" ? "auto" : "0%", // Position below if there's space
            bottom: dropdownPosition === "above" ? "0%" : "auto", // Position above if there's not enough space
          }}
        >
          <div
            className={`w-full flex items-center bg-[#2563eb] px-2 h-10 rounded-[1px] justify-center`}
          >
            <div className="text-white text-sm text-center w-full capitalize">
              {title}
            </div>
          </div>
          <ul className="sub-menu space-y-4 relative before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[3px] before:bg-blue-500/10 before:rounded">
            {children}
          </ul>
        </div>
      )} */}

      {/*  */}

      {navExpend && (
        <div
          ref={contentRef}
          className={`children-container rounded-md overflow-hidden transition-all duration-500 ease-in-out`}
          style={{
            maxHeight: open ? contentRef.current?.scrollHeight : 0,
          }}
        >
          <ul className="sub-menu space-y-4 relative before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[3px] before:bg-blue-500/10 before:rounded">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccordionLevelOneMenu;
