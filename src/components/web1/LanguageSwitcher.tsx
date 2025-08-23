"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import i18n from "@/locale/i18n";

interface Props {
  className?: string;
}

const LanguageSwitcher: React.FC<Props> = ({ className = "" }) => {
  // useEffect(() => {
  //   const storedLang = localStorage.getItem("language")
  //   if (storedLang) {
  //     i18n.changeLanguage(storedLang)
  //   }
  // }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={twMerge(
            "uppercase bg-slate-400/25 flex items-center px-4 outline-none h-12 rounded-lg text-xl",
            className
          )}
        >
          {/* <Image alt="fr" src={IMAGES.fr} /> */}
          {i18n.language} <ChevronDown className="ml-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-200">
        <DropdownMenuItem
          onClick={() => changeLanguage("fr")}
          className="bg-transparent hover:bg-transparent focus:bg-transparent focus:text-black"
        >
          <button className=" flex items-center px-4 outline-none h-12 rounded-xl gap-x-4">
            {/* <Image alt="fr" src={IMAGES.fr} /> */}
            Français
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className="bg-transparent hover:bg-transparent focus:bg-transparent focus:text-black"
        >
          <button className="flex items-center px-4 outline-none h-12 rounded-xl gap-x-4">
            {/* <Image alt="en" src={IMAGES.en} /> */}
            English
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
