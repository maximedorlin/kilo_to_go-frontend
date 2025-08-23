"use client";

import React from "react";

import { GrSettingsOption, GrUserAdmin } from "react-icons/gr";
import GrouppedMenu from "./GrouppedMenu";
import AccordionLevelOneMenu from "./AccordionLevelOneMenu";

import SideBarLink from "./SideBarLink";
import SimpleNoAccordion from "./SimpleNoAccordion";
import { BiMessage } from "react-icons/bi";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { MdDashboardCustomize } from "react-icons/md";
import { useAppSelector } from "@/hooks/redux-toolkit";
const Sidebar = () => {
  const user_name = useAppSelector((state) => state.auth.user.first_name);
  const navExpend = useAppSelector((state) => state.theme.navExpend);
  return (
    <section
      className={`relative overflow-y-auto z-10 ${
        navExpend ? "w-[270px] " : "w-[80px]"
      } h-full bg-white transition-all duration-200 ease-in-out  border-solid border-2 border-slate-500/25 over  `}
    >
      <div
        className={`p-4  text-blue-500 font-bold border-solid border-b-2 border-slate-500/25  ${
          !navExpend && "justify-center"
        } transition-all duration-500 ease-in-out`}
      >
        {navExpend ? (
          <Image src={IMAGES.logo_cud_tranparent} alt="logo-cud" />
        ) : (
          <Image src={IMAGES.logo_cud_tranparent} alt="logo-cud" />
        )}
        {/* <GrSettingsOption
          size={navExpend ? 35 : 25}
          className="cursor-pointer"
          />
          <p className={`text-wl ${navExpend ? "" : "hidden"}`}>Dash Tail</p> */}
        {navExpend && (
          <div className="flex items-center mt-5 gap-x-4">
            <div
              className={` ${
                !navExpend ? "w-5 h-5" : "w-10 h-10"
              } bg-gradient-to-r from-green-200 to-red-200 rounded-full`}
            ></div>
            {navExpend && (
              <p className="text-black"> {user_name.toUpperCase()} </p>
            )}
          </div>
        )}
      </div>

      <div className={`${navExpend ? "p-4" : "p-1"}`}>
        <SimpleNoAccordion
          active
          Icon={MdDashboardCustomize}
          title="Dashboard"
        />

        <GrouppedMenu title={`Menu `}>
          <div className="gap-y-2">
            {Array.from({ length: 2 }, (_, accordionIndex) => (
              <AccordionLevelOneMenu
                key={accordionIndex}
                Icon={accordionIndex % 2 === 0 ? GrSettingsOption : GrUserAdmin}
                title={`Accordion ${accordionIndex + 1}`}
              >
                <>
                  <SideBarLink active title="Home" />
                  <SideBarLink title="Profile" />
                  <SideBarLink title="Settings" />
                  <SideBarLink title="Management" />
                </>
              </AccordionLevelOneMenu>
            ))}
          </div>
        </GrouppedMenu>

        <SimpleNoAccordion Icon={BiMessage} title="Chat" />
        {Array.from({ length: 2 }, (_, index) => (
          <GrouppedMenu key={index} title={`Menu ${index + 1}`}>
            <div className="gap-y-2">
              {Array.from({ length: 2 }, (_, accordionIndex) => (
                <AccordionLevelOneMenu
                  key={accordionIndex}
                  Icon={
                    accordionIndex % 2 === 0 ? GrSettingsOption : GrUserAdmin
                  }
                  title={`Accordion ${accordionIndex + 1}`}
                >
                  <>
                    {/* Varying SideBarLinks */}
                    {accordionIndex === 0 && (
                      <>
                        <SideBarLink active title="Home" />
                        <SideBarLink title="Profile" />
                        <SideBarLink title="Settings" />
                        <SideBarLink title="Management" />
                      </>
                    )}
                    {accordionIndex === 1 && (
                      <>
                        <SideBarLink title="Dashboard" />
                        <SideBarLink active title="Reports" />
                        <SideBarLink title="Analytics" />
                      </>
                    )}
                    {accordionIndex === 2 && (
                      <>
                        <SideBarLink title="Projects" />
                        <SideBarLink title="Team" />
                        <SideBarLink active title="Tasks" />
                      </>
                    )}
                  </>
                </AccordionLevelOneMenu>
              ))}
            </div>
          </GrouppedMenu>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
