"use client";
import React from "react";

// import Image from "next/image";
// import IMAGES from "@/constants/images";
// import { MdOutlineFolder } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "@/lib/breackcrumbs-config";
import { useTranslation } from "react-i18next";
import { BreadcrumbConfig } from "@/data/breakcrumbdatas";
import { HomeIcon } from "lucide-react";
// import QuickCommand from "./QuickCommand";

const CustumBreadcrumb: React.FC<{
  firstElement: string;
  breakCrumbList?: BreadcrumbConfig;
}> = ({ breakCrumbList }) => {
  const pathname = usePathname();

  const pathnames = breakCrumbList
    ? generateBreadcrumbs(pathname, breakCrumbList)
    : generateBreadcrumbs(pathname);

  const { t } = useTranslation();
  return (
    <div className="relative min-h-10 rounded-lg overflow-hidden mb-5 shadow-md">
      <div className="bg-white h-full w-full p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          {/* <div className="rounded-xl h-12 bg-[#EBEBEB] xl:w-1/4 flex items-center px-5">
            <button>
              <Search />
            </button>
            <input
              type="text"
              className="bg-transparent outline-none focus:outline-none h-full w-full pl-3"
            />
          </div> */}

          {/* <QuickCommand /> */}
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink href="/home" className="flex items-center gap-2">
                <HomeIcon size={22} />
                <BreadcrumbSeparator />
              </BreadcrumbLink>
              {pathnames.map((pathname, index) => (
                <React.Fragment key={index}>
                  {pathname.path != "/home" && (
                    <>
                      <BreadcrumbItem>
                        {index == pathnames.length - 1 ? (
                          <BreadcrumbPage className="text-primary font-semibold">
                            {t(pathname.title)}
                          </BreadcrumbPage>
                        ) : (
                          <React.Fragment>
                            <BreadcrumbLink href={pathname.path}>
                              {t(pathname.title)}
                            </BreadcrumbLink>
                          </React.Fragment>
                        )}
                      </BreadcrumbItem>
                      {index < pathnames.length - 1 && <BreadcrumbSeparator />}
                    </>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* <Image
        alt="-"
        src={IMAGES.background_breckcrumb}
        className="absolute top-0 left-0 w-full h-full opacity-5 z-10 object-cover"
      /> */}
    </div>
  );
};

export default CustumBreadcrumb;
