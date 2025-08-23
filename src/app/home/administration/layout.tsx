"use client";
import Sidebar from "@/components/side/SideBar";
import CustumBreadcrumb from "@/components/ui/CustumBreadcrumb";
import { administrationBreakCrumbConfig } from "@/data/administration-breakcrumbdatas";
import { administration_sidelinks } from "@/data/sidelinks/administration-sidelinks";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { setIsHomeFalse } from "@/store/slices/homePageSlice";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [value, setValue] = useIsCollapsed();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsHomeFalse());
  }, [dispatch]);
  const { t } = useTranslation();
  return (
    <div className="">
      <Sidebar
        isCollapsed={value}
        setIsCollapsed={setValue}
        module_name={t("administration")}
        sidelinks={administration_sidelinks}
      />
      <div className={`${value ? "md:ml-[74px]" : "md:ml-64"}`}>
        <CustumBreadcrumb
          firstElement={t("administration")}
          breakCrumbList={administrationBreakCrumbConfig}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
