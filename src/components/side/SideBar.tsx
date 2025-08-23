"use client";
import { useEffect, useState } from "react";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { Layout } from "./layout";
import { Button } from "../ui/button";
import { GrClose } from "react-icons/gr";
import { ChevronLeft, MenuIcon } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideLink } from "@/data/sideTypes";
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  sidelinks: SideLink[];
  module_name: string;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  sidelinks,
  module_name,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Below md

    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsCollapsed(false); // Uncollapse when < md
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      setIsCollapsed(false);
    }

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [setIsCollapsed]);

  useEffect(() => {
    // Fonction appelée à chaque changement de route
    setNavOpened(false);
  }, [pathname]);

  return (
    <aside
      className={cn(
        ` fixed left-0 right-0 top-0 md:top-20 md:pt-16 bg-white z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-[90%] ${
          isCollapsed ? "md:w-[80px] md:left-2 rounded-lg shadow-md" : "md:w-64"
        }`,
        className
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        {/* Header */}
        <Layout.Header
          sticky
          className={`z-50 flex ${
            isCollapsed ? "justify-center" : "justify-between"
          }  py-3 text-primary-foreground shadow-sm md:hidden`}
        >
          <div
            className={`flex items-center ${
              !isCollapsed ? "gap-2" : "justify-center"
            }`}
          >
            {/* <span
              className={`transition-all flex justify-center ${
                isCollapsed ? "h-6 w-6" : "h-8 w-8"
              }`}
            > */}
            {isCollapsed && (
              <Link href={"/home"}>
                <div
                  className={`flex md:hidden justify-center md:justify-between gap-1 items-center`}
                >
                  <div className="w-16 h-16 z-20">
                    <Image
                      src={IMAGES.logo_cud_tranparent}
                      alt="Logo CUD"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-4xl md:text-sm text-black flex justify-center items-center">
                    {module_name}
                  </span>
                </div>
              </Link>
            )}
            {/* </span> */}
            <div
              className={`md:hidden flex flex-col justify-end truncate md:-translate-x-4 ${
                isCollapsed ? "invisible w-0" : "visible w-auto"
              }`}
            >
              <span>
                <Link href={"/home"}>
                  <div
                    className={`md:flex justify-center md:justify-between gap-1 items-center`}
                  >
                    <div className="w-16 h-16 z-20">
                      <Image
                        src={IMAGES.logo_cud_tranparent}
                        alt="Logo CUD"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <span className="md:text-xl text-black">{module_name}</span>
                  </div>
                </Link>
              </span>
            </div>
          </div>

          <Button
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <GrClose /> : <MenuIcon />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`sidebar-scrollbar z-40 h-full flex-1 overflow-auto bg-white rounded-b-md p-4 ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="ghost"
          className={`absolute top-4 z-50 hidden rounded-md md:inline-flex bg-[#DEDEDE] ${
            isCollapsed ? "right-1/2 left-1/2 -translate-x-1/2" : "right-4"
          } hover:bg-accent`}
        >
          <ChevronLeft
            // stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
